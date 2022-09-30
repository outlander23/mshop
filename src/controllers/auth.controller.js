import catchAsync from "../utils/catchAsync.js";
import joiErrorHandler from "../errors/joiErrorHandler.js";
import { User, validateUserData } from "../models/user.model.js";
import handleValidationError from "../errors/validationError.js";
import { createSendToken } from "../utils/jwtToken.js";
import { decrypt } from "../utils/cryptoHelper.js";
import { JWT_SECRET } from "../utils/env.js";
import { promisify } from "util";

export const signin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const data = { username, password };
  const error = validateUserData(data);
  if (error) return handleValidationError(res, error);
  const user = await User.create(data);
  createSendToken(user, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const data = { username, password };
  const error = validateUserData(data);
  if (error) return handleValidationError(res, error);
  const user = await User.findOne({ username });
  if (user && user.isValidPassword(password)) {
    createSendToken(user, 200, req, res);
  } else
    res.status(203).send({
      status: "fail",
      massage: "Invalid username or password",
    });
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, decrypt(JWT_SECRET));

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
export const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        decrypt(JWT_SECRET)
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
