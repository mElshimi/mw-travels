import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    tripName: {
      type: String,
      required: true,
      minLength: [2, "too short product name"],
      unique: [true, "tripName is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "too short trip description"],
      maxLength: [500, "too long trip description"],
      unique: [true, "description is required"],
      trim: true,
    },
    imgCover: String,
    images: [],
    price: { type: Number, min: 0, required: true },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
schema.post("init", function (doc) {
  if (doc.imgCover || doc.images) {
    doc.imgCover = process.env.baseUrl + "uploads/" + doc.imgCover;
    doc.images = doc.images?.map(
      (img) => process.env.baseUrl + "uploads/" + img
    );
  }
});

export const tripModel = mongoose.model("trip", schema);
