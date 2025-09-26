// backend/models/Coupon.js
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    appliesTo: { type: String, enum: ["cart", "product"], default: "cart" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    expiryDate: { type: Date, required: true },
    minCartValue: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const couponModel =
  mongoose.models.coupon || mongoose.model("coupon", couponSchema);

export default couponModel;
