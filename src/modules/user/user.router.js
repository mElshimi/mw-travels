import express from "express";

import { validation } from "../../middleware/validation.js";

import {
  addUserValidation,
  paramsIdVAlidation,
  updateUserValidation,
} from "./user.validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRouter = express.Router({mergeParams:true});

userRouter.route("/").post(validation(addUserValidation), checkEmail  ,addUser).get(getAllUsers);
userRouter
  .route("/:id")
  .get(validation(paramsIdVAlidation), getSingleUser)
  .put(validation(updateUserValidation), updateUser)
  .delete(validation(paramsIdVAlidation), deleteUser);

export default userRouter;
