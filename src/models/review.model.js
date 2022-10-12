import mongoose from "mongoose";
import Joi from "joi";
import joiErrorHandler from "../errors/joiErrorHandler.js";
import { Product } from "./product.model.js";

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

reviewSchema.index({ productID: 1, userID: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userID",
    select: "username",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productID) {
  const stats = await this.aggregate([
    {
      $match: { productID: productID },
    },
    {
      $group: {
        _id: "$productID",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productID, {
      number_of_review: stats[0].nRating,
      avg_rating: stats[0].avgRating,
    });
  }
};
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.productID);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.productID);
});

const joiReviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  review: Joi.string().min(3).max(2048).required(),
  userID: Joi.string().hex().length(24).required(),
  productID: Joi.string().hex().length(24).required(),
});

function validateReviewData(data) {
  return joiErrorHandler(data, joiReviewSchema);
}

const Review = new mongoose.model("Review", reviewSchema);

const reviewNumericFields = ["rating"];
const reviewFields = ["rating", "review", "userID", "productID"];

export { validateReviewData, Review, reviewNumericFields, reviewFields };
