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

export const getReview = getOne(Review);
export const deleteReview = deleteOne(Review);
export const getAllReviews = getAll(Review, reviewFields, reviewNumericFields);
export const createReview = createOne(Review, reviewFields, validateReviewData);
export const updateReview = updateOne(Review, reviewFields, validateReviewData);
