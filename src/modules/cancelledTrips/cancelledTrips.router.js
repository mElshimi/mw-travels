import express from "express";
import { allowedTo, protectedRoute } from "../auth/auth.js";
import { getAllCancelledTrips } from "./cancelledTrips.controller.js";


const cancelledTrip = express.Router()
cancelledTrip.use(protectedRoute , allowedTo('user'))
cancelledTrip
  .route("/")
  .get(getAllCancelledTrips)


export default cancelledTrip;
