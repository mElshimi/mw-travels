import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: [true, "categoryName is required"],
      minLength: [2, "too short category name"],
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "too short trip description"],
      maxLength: [500, "too long trip description"],
      unique: [true, "description is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    image: String,
  },
  { timestamps: true }
);
schema.post('init', function (doc) {
  doc.image = process.env.baseUrl + "uploads/" + doc.image;
});
export const categoryModel = mongoose.model("category", schema);
