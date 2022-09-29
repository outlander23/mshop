import mongoose from "mongoose";
import Joi from "joi";

const reviewSchema = mongoose.Schema(
  {
    rating: Number,
    review: String,
    userID: mongoose.Schema.ObjectId,
    productID: mongoose.Schema.ObjectId,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const joiReviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  review: Joi.string().min(3).max(2048).required(),
  userID: Joi.string().hex().length(24),
  productID: Joi.string().hex().length(24),
});
