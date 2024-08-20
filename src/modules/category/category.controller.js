import { categoryModel } from "../../../dataBase/models/category.model.js";
import slugify from "slugify";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteOne } from "../../middleware/handlers/handlers.js";
import ApiFeatures from "../../utils/ApiFeatures.js";

const addCategory = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.categoryName);
  req.body.image = req.file.filename;
  let category = new categoryModel(req.body);
  await category.save();
  res.json({ message: "success", category });
});

const getAllCategory = asyncHandler(async (req, res) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query).fields().sort().search().pagination().filtration();
  let categories = await apiFeatures.mongooseQuery;
  categories && res.json({ message: "success",page:apiFeatures.pageNumber, categories });
  !categories && res.status(404).json({ message: "Categories Not  Found" });
});


const getSingleCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  category && res.json({ message: "success", category });
  !category && res.status(404).json({ message: "Category Not Found" });
});

const updateCategory = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.categoryName);

  if (req.file) req.body.image = req.file.filename;
  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  category && res.json({ message: "success", category });
  !category && res.status(404).json({ message: "Category Not Found" });
});

const deleteCategory = deleteOne(categoryModel)
export {
  updateCategory,
  addCategory,
  deleteCategory,
  getSingleCategory,
  getAllCategory,
};
