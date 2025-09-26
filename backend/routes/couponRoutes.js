// backend/routes/couponRoutes.js
import express from "express";
import {
  createCoupon,
  getCoupons,
  deleteCoupon,
  toggleCoupon,
  applyCoupon,
} from "../controllers/couponController.js";
import authUser from "../middleware/auth.js"

const router = express.Router();

router.post("/", createCoupon);
router.get("/", getCoupons);
router.delete("/:id", deleteCoupon);
router.patch("/:id/toggle", toggleCoupon);

// ✅ Apply coupon
router.post("/apply", authUser, applyCoupon);

export default router;
