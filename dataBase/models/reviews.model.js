import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      minLength: [2, "too short reviews text"],
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    rate:{
        type:Number,
        min:0,
        max:5,
    },
  },
  { timestamps: true }
);
schema.pre(/^find/,function(){
  this.populate('user','name')
})
export const reviewsModel = mongoose.model("reviews", schema);
