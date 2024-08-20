import { reviewsModel } from "../../../dataBase/models/reviews.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteOne } from "../../middleware/handlers/handlers.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";

const addReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  let idReviewExist = await reviewsModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (idReviewExist) return next(new AppError("You Created Review Before "));
  let review = new reviewsModel(req.body);
  await review.save();
  res.json({ message: "success", review });
});

const getAllReviews = asyncHandler(async (req, res) => {
  let apiFeatures = new ApiFeatures(reviewsModel.find({}), req.query)
    .fields()
    .sort()
    .search()
    .pagination()
    .filtration();
  let review = await apiFeatures.mongooseQuery;

  !review && res.status(404).json({ message: "review Not  Found" });
  review &&
    res.json({ message: "success", page: apiFeatures.pageNumber, review });
});

const getSingleReview = asyncHandler(async (req, res) => {
  const review = await reviewsModel.findById(req.params.id);
  !review && res.status(404).json({ message: "Review Not Found" });
  review && res.json({ message: "success", review });
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewsModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  !review && res.status(404).json({ message: "Review Not Found" });
  review && res.json({ message: "success", review });
});

const deleteReview = deleteOne(reviewsModel);

export {
  updateReview,
  addReview,
  deleteReview,
  getSingleReview,
  getAllReviews,
};
