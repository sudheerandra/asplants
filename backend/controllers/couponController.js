
import Coupon from "../models/couponModel.js";


// ✅ Create a coupon
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      appliesTo,
      productId,
      expiryDate,
      minCartValue,
      isActive,
    } = req.body;

    // 🔹 Sanitize inputs
    const payload = {
      code: code?.trim(),
      discountType,
      discountValue: Number(discountValue),
      appliesTo: appliesTo || "cart",
      productId: productId || null,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      minCartValue: Number(minCartValue) || 0,
      isActive: typeof isActive === "boolean" ? isActive : true,
    };

    // 🔹 Validate required fields manually (extra safety)
    if (!payload.code || !payload.discountType || !payload.discountValue || !payload.expiryDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔹 Duplicate check
    const existingCoupon = await Coupon.findOne({ code: payload.code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = new Coupon(payload);
    await coupon.save();

    res.status(201).json(coupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete coupon
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Toggle coupon active/inactive
export const toggleCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    coupon.isActive = !coupon.isActive;
    await coupon.save();

    res.json(coupon);
  } catch (error) {
    console.error("Error toggling coupon:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Apply Coupon
export const applyCoupon = async (req, res) => {
  try {
    const { code, cartAmount, userId } = req.body;

    // 🔹 Find active coupon
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Invalid or inactive coupon" });
    }

    // 🔹 Check if user already used it
    if (coupon.usedBy?.includes(userId)) {
      return res.status(400).json({ success: false, message: "Coupon already used by you!" });
    }

    // 🔹 Check expiry
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }

    // 🔹 Check minimum cart value
    if (cartAmount < (coupon.minCartValue || 0)) {
      return res.status(400).json({
        success: false,
        message: `Minimum cart value should be ₹${coupon.minCartValue}`,
      });
    }

    // 🔹 Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = Math.floor((cartAmount * coupon.discountValue) / 100);
    } else {
      discountAmount = coupon.discountValue;
    }

    // 🔹 Save usage
    coupon.usedBy = coupon.usedBy || [];
    coupon.usedBy.push(userId);
    await coupon.save();

    return res.json({
      success: true,
      discountAmount,
      coupon,
    });
  } catch (error) {
    console.error("Apply coupon error:", error);
    res.status(500).json({ success: false, message: "Server error applying coupon" });
  }
};


