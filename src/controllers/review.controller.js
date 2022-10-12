import {
  Review,
  reviewFields,
  validateReviewData,
  reviewNumericFields,
} from "../models/review.model.js";

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/handleFactory.js";

export const userAndTourIDs = (req, res, next) => {
  console.log(req.params);
  if (!req.body.productID) req.body.productID = req.params.productID;
  if (!req.body.userID) req.body.userID = req.user.id;
  next();
};

export const getReview = getOne(Review);
export const deleteReview = deleteOne(Review);
export const getAllReviews = getAll(Review, reviewFields, reviewNumericFields);
export const createReview = createOne(Review, reviewFields, validateReviewData);
export const updateReview = updateOne(Review, reviewFields, validateReviewData);
