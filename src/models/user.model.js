import Joi from "joi";
import mongoose from "mongoose";
import { decrypt, encrypt } from "../utils/cryptoHelper.js";
import joiErrorHandler from "../errors/joiErrorHandler.js";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const joiUserSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(8).max(32).required(),
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) this.password = encrypt(this.password);
  next();
});

userSchema.methods.isValidPassword = function (password) {
  const decryptedPassword = decrypt(this.password);
  return decryptedPassword === password;
};

function validateUserData(data) {
  return joiErrorHandler(data, joiUserSchema);
}

const User = new mongoose.model("User", userSchema);
const userFields = ["username", "password"];

export { User, validateUserData, userFields };
