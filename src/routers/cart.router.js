import express from "express";
import { protect } from "../controllers/auth.controller.js";
import { addToCart, addUserID } from "../controllers/cart.controller.js";

const cartRouter = express.Router({ mergeParams: true });

cartRouter.route("/").post(protect, addUserID, addToCart);

export default cartRouter;
