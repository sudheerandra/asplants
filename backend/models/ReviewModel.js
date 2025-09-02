import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productId: {type: String,required: true},
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
