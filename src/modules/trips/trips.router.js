import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../fileUpload/fileUpload.js";
import {
  addTripValidation,
  paramsIdVAlidation,
  updateTripValidation,
} from "./trips.validation.js";
import {
  deleteTrip,
  addTrip,
  updateTrip,
  getSingleTrip,
  getAllTrips,
} from "./trips.controller.js";

const tripRouter = express.Router({ mergeParams: true });

tripRouter
  .route("/")
  .post(
    uploadFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addTripValidation),
    addTrip
  )
  .get(getAllTrips);
tripRouter
  .route("/:id")
  .get(validation(paramsIdVAlidation), getSingleTrip)
  .put(
    uploadFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(updateTripValidation),
    updateTrip
  )
  .delete(validation(paramsIdVAlidation), deleteTrip);

export default tripRouter;
