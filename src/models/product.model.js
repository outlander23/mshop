import Joi from "joi";
import mongoose from "mongoose";
import { joiErrorHandler } from "../errors/index.js";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  imgs: [
    {
      type: String,
      required: true,
    },
  ],
  description: [
    {
      type: String,
      required: true,
    },
  ],
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  number_of_review: {
    type: Number,
    default: 0,
  },
  avg_rating: {
    type: Number,
    default: 0,
  },
});

const joiProductSchema = Joi.object({
  name: Joi.string().min(5).max(120).required(),
  brand: Joi.string()
    .required()
    .valid(
      "apple",
      "samsung",
      "xiaomi",
      "oppo",
      "realme",
      "huawei",
      "symphony",
      "nothing",
      "motorola",
      "walton",
      "nokia",
      "umidigi",
      "others"
    ),
  photo: Joi.string().max(1024).required(),
  price: Joi.number().required().min(0).max(10000000000),
  quantity: Joi.number().optional(),
  description: Joi.array().items(Joi.string().required()),
  discount: Joi.number().max(100).optional(),
});

function validateProductData(data) {
  return joiErrorHandler(data, joiProductSchema);
}

const Product = new mongoose.model("Product", productSchema);

const productFields = [
  "name",
  "brand",
  "photo",
  "price",
  "discount",
  "quantity",
  "description",
];

const productNumericFields = [
  "price",
  "quantity",
  "discount",
  "avg_rating",
  "number_of_review",
];

export { Product, validateProductData, productFields, productNumericFields };
