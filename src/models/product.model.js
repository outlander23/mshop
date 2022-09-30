import Joi from "joi";
import mongoose from "mongoose";
import { joiErrorHandler } from "../errors/index.js";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  short_description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  number_of_review: {
    type: Number,
    default: 0,
  },
  avg_rating: {
    type: Number,
    default: 0,
  },
  // imgs: [
  //   {
  //     type: String,
  //     required: true,
  //   },
  // ],
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

const joiProductSchema = Joi.object({
  name: Joi.string().min(5).max(120).required(),
  brand: Joi.string()
    .required()
    .valid("apple", "samsung", "xiaomi", "oppo", "realme", "huawei", "others"),
  price: Joi.number().required().min(0).max(10000000000),
  quantity: Joi.number().optional(),
  number_of_review: Joi.number().optional(),
  short_description: Joi.string().min(10).max(2024).required(),
  discount: Joi.number().max(100).optional(),
  tags: Joi.array().items(Joi.string()).required(),
});

function validateProductData(data) {
  return joiErrorHandler(data, joiProductSchema);
}

const Product = new mongoose.model("Product", productSchema);

const productFields = [
  "tags",
  "name",
  "brand",
  "price",
  "discount",
  "quantity",
  "number_of_review",
  "short_description",
];

const productNumericFields = [
  "price",
  "quantity",
  "discount",
  "avg_rating",
  "number_of_review",
];

export { Product, validateProductData, productFields, productNumericFields };
