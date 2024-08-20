import slugify from "slugify";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteOne } from "../../middleware/handlers/handlers.js";
import  ApiFeatures  from "../../utils/ApiFeatures.js";
import { tripModel } from "../../../dataBase/models/trips.model.js";

const addTrip = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.tripName);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let trip = new tripModel(req.body);
  await trip.save();
  res.json({ message: "success", trip });
});


const getAllTrips= asyncHandler(async (req, res) => {
  let  filterObj = {}
   if(req.params.category){
     filterObj.category = req.params.category
   }
   let apiFeatures = new ApiFeatures(tripModel.find(filterObj), req.query).fields().sort().search().pagination().filtration();
   let trips = await apiFeatures.mongooseQuery;
 
   !trips && res.status(404).json({ message: "trips Not  Found" });
   trips && res.json({ message: "success",page:apiFeatures.pageNumber , trips });
 });


const getSingleTrip = asyncHandler(async (req, res) => {
  const trip = await tripModel.findById(req.params.id);
  trip && res.json({ message: "success", trip });
  !trip && res.status(404).json({ message: "Trip Not Found" });
});

const updateTrip = asyncHandler(async (req, res) => {
  if(req.body.tripName) req.body.slug = slugify(req.body.tripName);
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images)   req.body.images = req.files.images.map((img) => img.filename);
  let trip = await tripModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  trip && res.json({ message: "success", trip });
  !trip && res.status(404).json({ message: "Trip Not Found" });
});

const deleteTrip = deleteOne(tripModel);

export {
  deleteTrip,
  addTrip,
  updateTrip,
  getSingleTrip,
  getAllTrips,
};
