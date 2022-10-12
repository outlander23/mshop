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
  getOne,
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

export const getProduct = getOne(Product);

export const deleteProduct = deleteOne(Product);
export const getAllProduct = getAll(Product, productNumericFields);
