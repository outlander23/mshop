import mongoose from "mongoose";
import { decrypt } from "../utils/cryptoHelper.js";
import { MONGODB_PASSWORD, MONGODB_STR } from "../utils/env.js";

const MONGODB_URI = MONGODB_STR.replace(
  "<password>",
  decrypt(MONGODB_PASSWORD)
);

const connectToMongoDB = () => {
  return mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.log("Failed to connect database"));
};
export default connectToMongoDB;
