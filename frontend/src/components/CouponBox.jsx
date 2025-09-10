// src/components/CouponBox.jsx
import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CouponBox = () => {
  const { applyCoupon, appliedCoupon, discount, removeCoupon } = useContext(ShopContext);
  const [code, setCode] = useState("");

  const handleApply = () => {
    if (!code.trim()) return;
    applyCoupon(code.trim());
    setCode("")
  };

  return (
    <div className="mt-2 my-10 p-4 bg-white shadow-md rounded-lg border border-gray-200">
  <h3 className="font-semibold text-gray-800 mb-2">Have a Coupon?</h3>

  {appliedCoupon ? (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-green-700 font-medium">
      <span className="text-sm sm:text-base">
        ✅ Coupon <strong>{appliedCoupon.code}</strong> applied! You saved ₹
        {discount}.
      </span>
      <button
        onClick={removeCoupon}
        className="text-red-600 hover:underline text-sm sm:text-base"
      >
        Remove
      </button>
    </div>
  ) : (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter coupon code"
        className="flex-1 border border-green-600 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring focus:ring-green-300"
      />
      <button
        onClick={handleApply}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
      >
        Apply
      </button>
    </div>
  )}
</div>
  );
};

export default CouponBox;
