import { request } from "express";
import { userModel } from "../../../dataBase/models/user.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const signup = asyncHandler(async (req, res) => {
  let user = new userModel(req.body);
  await user.save();
  let token = jwt.sign(
    { userID: user._id, role: user.role },
    process.env.secret_key
  );
  res.json({ message: "success", token });
});

const signin = asyncHandler(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  {
  }
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.secret_key
    );
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});

const changePassword = asyncHandler(async (req, res, next) => {
  let user = await userModel.findById(req.user.id);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.secret_key
    );
    await userModel.findByIdAndUpdate(req.user.id, {
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});

const allowedTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("you not authorize to access this", 401));
    next();
  });
};

const protectedRoute = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("token not provided", 401));
  let decoded = jwt.verify(token, process.env.secret_key);
  let user = await userModel.findById(decoded?.userID);
  if (!user) return next(new AppError("user not found", 401));
  if (user?.passwordChangedAt) {
    let time = parseInt(user?.passwordChangedAt.getTime() / 1000);
    if (time > decoded?.iat)
      return next(new AppError("Invalid Token Please Login Again"));
  }
  req.user = user
  next();
});

export { protectedRoute, signin, signup, changePassword, allowedTo };
