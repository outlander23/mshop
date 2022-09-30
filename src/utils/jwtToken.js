import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { JWT_COOKIE_EXPIRES_IN, JWT_EXPIRES_IN, JWT_SECRET } from "./env.js";
import { decrypt } from "./cryptoHelper.js";

const jwtGenerate = (data) => {
  return jwt.sign({ id: data._id }, decrypt(JWT_SECRET), {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const createSendToken = (user, statusCode, req, res) => {
  const token = jwtGenerate(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).send({
    status: "success",
    token,
    data: user,
  });
};
