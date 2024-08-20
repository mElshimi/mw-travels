import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoute } from "../auth/auth.js";
import { addToCart, clearUserCart, getAllSelectedTrips, getAllUserCart, removeFromCart, updateQuantity } from "./cart.controller.js";
import { addToCartVal, paramsIdVAlidation, updateQTYVal } from "./cart.validation.js";



const cartRouter = express.Router()
cartRouter.use(protectedRoute , allowedTo('user'))
cartRouter
  .route("/")
  .patch(validation(addToCartVal), addToCart)
  .get(getAllUserCart)
  .delete(clearUserCart);

  cartRouter.route("/allSelectedTrips").get(getAllSelectedTrips)

  cartRouter
  .route("/:id").put(validation(updateQTYVal),updateQuantity)
 .delete( validation(paramsIdVAlidation), removeFromCart);

export default cartRouter;
