import { cancelledTripsModel } from "../../../dataBase/models/cancelledTrips.js";
import { cartModel } from "../../../dataBase/models/cart.model.js";
import { tripModel } from "../../../dataBase/models/trips.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteOne } from "../../middleware/handlers/handlers.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";

const calcTotalCartPrice = (cart) => {
  let totalCartPrice = 0;
  cart.cartItems.forEach((item) => {
    totalCartPrice += item.price 
  });
  cart.totalCartPrice = totalCartPrice;
};
const addToCart = asyncHandler(async (req, res, next) => {
  let trip = await tripModel.findById(req.body.trip);
  if (!trip) return next(new AppError("trip not found"), 404);

  if (trip.quantity < req.body.quantity)
    return next(new AppError("Sold Out"));
  req.body.price = trip.price;

  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalCartPrice(cart);

    await cart.save();
    cart && res.json({ message: "success", cart });
  } else {
    let item = isCartExist.cartItems.find(
      (item) => item.trip == req.body.trip
    );
    if (item) {
      if (item.quantity >= trip.quantity)
        return next(new AppError("Sold Out"));
      item.quantity += req.body.quantity || 1;
    } else isCartExist.cartItems.push(req.body);
    calcTotalCartPrice(isCartExist);
    await isCartExist.save();
    res.json({ message: "success", cart: isCartExist });
  }
});

const getAllUserCart = asyncHandler(async (req, res) => {
  let cart = await cartModel.findOne({user:req.user._id}).populate('cartItems.trip')
  cart && res.json({ message: "success", cart });
  !cart && res.status(404).json({ message: "cart Not  Found" });
});

const getAllSelectedTrips = asyncHandler(async (req, res) => {
  let cart = await cartModel.find().populate('user','name email').populate('cartItems.trip')
  cart && res.json({ message: "success", cart });
  !cart && res.status(404).json({ message: "cart Not  Found" });
});


const clearUserCart = asyncHandler(async (req, res) => {
   let cart = await cartModel.findOneAndDelete({user:req.user._id},{new:true}).populate('cartItems.trip')
   !cart && res.status(404).json({ message: "cart Not  Found" });
  cart && res.json({ message: "success", cart });
});


const updateQuantity = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.user._id });
  !cart && res.status(404).json({ message: "cart Not Found" });

  let item = cart.cartItems.find((item) => item._id == req.params.id);
  if (!item) return next(new AppError("Item not found"), 404);
  item.quantity = req.body.quantity;
  calcTotalCartPrice(cart);
  await cart.save();
  cart && res.json({ message: "success", cart });
});

const removeFromCart = asyncHandler(async (req, res) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  )
  calcTotalCartPrice(cart);
  await cart.save();

  !cart && res.status(404).json({ message: "Cart Not Found" });
  cart && res.json({ message: "success", cart });
  let cancelledTrip = new cancelledTripsModel({
    user: req.user._id,
    cartItems: [req.body],
  })
  await cancelledTrip.save();  
  
});

export { addToCart, updateQuantity, getAllUserCart, removeFromCart , clearUserCart , getAllSelectedTrips};
