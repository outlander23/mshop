import express from "express";
import authRouter from "./auth.router.js";
import reviewRouter from "./review.router.js";
import productRouter from "./product.router.js";
import cartRouter from "./cart.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/review", reviewRouter);
router.use("/product", productRouter);

export default router;
