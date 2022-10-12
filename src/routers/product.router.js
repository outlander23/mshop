import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import reviewRouter from "./review.router.js";

const productRouter = express.Router();

productRouter.use("/:productID/review", reviewRouter);

productRouter
  .route("/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getProduct);
productRouter.route("/").post(createProduct).get(getAllProduct);

export default productRouter;
