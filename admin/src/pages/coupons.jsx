// src/pages/coupons.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import CouponList from "../components/couponsList";
import AddCoupon from "../components/addCoupons";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);

  // ✅ Fetch coupons on load
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/coupons`);
      //console.log("DATA..", data);
      setCoupons(data);
    } catch (error) {
      toast.error("Failed to fetch coupons");
    }
  };

  // ✅ Add coupon
  const handleCouponAdded = async (newCoupon) => {
    //console.log("FRONTEND COUPON DATA...", newCoupon);

    try {
      const { data } = await axios.post(`${backendUrl}/api/coupons`, newCoupon);
      setCoupons((prev) => [data, ...prev]);
      toast.success("Coupon added successfully!");
    } catch (error) {
      const msg = error.response?.data?.message || "Error adding coupon";
      if (msg.includes("exists")) {
        toast.error(
          "⚠️ Coupon code already exists. Please choose another one."
        );
      } else {
        toast.error(msg);
      }
    }
  };

  // ✅ Delete coupon
  const handleDeleteCoupon = async (id) => {
    //console.log("COUPON ID....", id);

    try {
      await axios.delete(`${backendUrl}/api/coupons/${id}`);
      setCoupons((prev) => prev.filter((c) => c._id !== id));
      toast.success("Coupon deleted");
    } catch (error) {
      toast.error("Error deleting coupon");
    }
  };

  // ✅ Toggle coupon
  const handleToggleCoupon = async (id) => {
      try {
      const { data } = await axios.patch(
        `${backendUrl}/api/coupons/${id}/toggle`
      );
      setCoupons((prev) => prev.map((c) => (c._id === id ? data : c)));
      toast.success("Coupon status updated");
    } catch (error) {
      toast.error("Error updating coupon");
    }
  };

  return (
    <div className="p-1">
      <AddCoupon onCouponAdded={handleCouponAdded} />
      <CouponList
        coupons={coupons}
        onDelete={handleDeleteCoupon}
        onToggle={handleToggleCoupon}
      />
    </div>
  );
};

export default CouponsPage;
