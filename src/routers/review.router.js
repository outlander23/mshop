import express from "express";
import {
  createReview,
  deleteReview,
  updateReview,
  getAllReviews,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.route("/:id").patch(updateReview).delete(deleteReview);
reviewRouter.route("/").post(createReview).get(getAllReviews);

export default reviewRouter;
