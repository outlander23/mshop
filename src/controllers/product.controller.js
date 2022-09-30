import {
  Product,
  productFields,
  validateProductData,
  productNumericFields,
} from "../models/product.model.js";

import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../utils/handleFactory.js";

export const updateProduct = updateOne(
  Product,
  productFields,
  validateProductData
);

export const createProduct = createOne(
  Product,
  productFields,
  validateProductData
);

export const deleteProduct = deleteOne(Product);
export const getAllProduct = getAll(Product, productNumericFields);
