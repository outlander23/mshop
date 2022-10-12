import express from "express";
import { protect } from "../controllers/auth.controller.js";

import {
  createReview,
  deleteReview,
  updateReview,
  getAllReviews,
  userAndTourIDs,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route("/:id").patch(updateReview).delete(deleteReview);
reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(protect, userAndTourIDs, createReview);

export default reviewRouter;
