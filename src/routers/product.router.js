import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/:id").patch(updateProduct).delete(deleteProduct);
productRouter.route("/").post(createProduct).get(getAllProduct);

export default productRouter;
