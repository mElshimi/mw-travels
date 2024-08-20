import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteOne } from "../../middleware/handlers/handlers.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import { userModel } from "../../../dataBase/models/user.model.js";

const addUser = asyncHandler(async (req, res) => {
  let user = new userModel(req.body);
  await user.save();
  res.json({ message: "success"});
});




const getAllUsers= asyncHandler(async (req, res) => {
 
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
  .fields().sort().search().pagination().filtration();
  let user = await apiFeatures.mongooseQuery;
  !user && res.status(404).json({ message: "user Not  Found" });
  user && res.json({ message: "success",page:apiFeatures.pageNumber , user});
});











const getSingleUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  !user && res.status(404).json({ message: "User Not Found" });
  user && res.json({ message: "success", user });
});

const updateUser = asyncHandler(async (req, res) => {

  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  !user && res.status(404).json({ message: "User Not Found" });
  user && res.json({ message: "success", user });
});

const deleteUser = deleteOne(userModel);

export {
  updateUser,
  addUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
};
