import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCategoryValidation, paramsIdVAlidation, updateCategoryValidation } from "./category.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { allowedTo, protectedRoute } from "../auth/auth.js";
import tripRouter from "../trips/trips.router.js";

const categoryRouter = express.Router();
categoryRouter.use('/:category/trips' , tripRouter)
categoryRouter.route("/").post(protectedRoute , allowedTo( 'user','admin'),uploadSingleFile('img'),validation(addCategoryValidation) , addCategory).get(getAllCategory);
categoryRouter
  .route("/:id")
  .get(validation(paramsIdVAlidation),getSingleCategory)
  .put(protectedRoute ,uploadSingleFile('img') ,validation(updateCategoryValidation),updateCategory)
  .delete(protectedRoute,validation(paramsIdVAlidation),deleteCategory);

export default categoryRouter;
