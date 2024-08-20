import { cancelledTripsModel } from "../../../dataBase/models/cancelledTrips.js";
import { tripModel } from "../../../dataBase/models/trips.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteOne } from "../../middleware/handlers/handlers.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";


const getAllCancelledTrips = asyncHandler(async (req, res) => {
  let cart = await cancelledTripsModel.find().populate('user','name email').populate('cartItems._id')
  cart && res.json({ message: "success", cart });
  !cart && res.status(404).json({ message: "cart Not  Found" });
});




export {  getAllCancelledTrips};
