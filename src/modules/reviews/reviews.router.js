import express from "express";

import { validation } from "../../middleware/validation.js";
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from "./reviews.controller.js";
import { addReviewValidation, paramsIdVAlidation, updateReviewValidation } from "./reviews.validation.js";
import { allowedTo, protectedRoute } from "../auth/auth.js";


const reviewRouter = express.Router({mergeParams:true});

reviewRouter
  .route("/")
  .post(protectedRoute , allowedTo('user')  , validation(addReviewValidation), addReview)
  .get(getAllReviews);
reviewRouter
  .route("/:id")
  .get(validation(paramsIdVAlidation), getSingleReview)
  .put(protectedRoute , allowedTo( 'user'),validation(updateReviewValidation), updateReview)
  .delete(protectedRoute , allowedTo( 'user','admin'), validation(paramsIdVAlidation), deleteReview);

export default reviewRouter;
