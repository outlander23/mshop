import catchAsync from "../utils/catchAsync.js";
import joiErrorHandler from "../errors/joiErrorHandler.js";
import { User, validateUserData } from "../models/user.model.js";
import handleValidationError from "../errors/validationError.js";

export const signin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const data = { username, password };

  const error = validateUserData(data);

  if (error) return handleValidationError(res, error);

  const user = await User.create(data);

  res.status(201).send({
    status: "success",
    token: "",
    data: user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const data = { username, password };
  const error = validateUserData(data);
  if (error) return handleValidationError(res, error);
  const user = await User.findOne({ username });
  if (user && user.isValidPassword(password)) {
    res.status(200).send({
      status: "success",
      token: "",
    });
  }
  res.status(203).send({
    status: "fail",
    massage: "Invalid username or password",
  });
});
