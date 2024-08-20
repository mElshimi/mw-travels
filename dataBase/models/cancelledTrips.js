import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: "user", name: String }],
    cartItems: [
      {
        trip: { type: mongoose.Types.ObjectId, ref: "trip" },
        price: Number,
      },
    ],
    totalCartPrice: Number,

  },
  { timestamps: true }
);
export const cancelledTripsModel = mongoose.model("cancelledTrip", schema);
