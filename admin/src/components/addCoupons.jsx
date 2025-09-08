// src/components/admin/AddCoupon.jsx
import React, { useState } from "react";

const AddCoupon = ({ onCouponAdded }) => {
  const [formData, setFormData] = useState({
    id: "", // frontend-only id
    code: "",
    discountType: "percentage",
    discountValue: "",
    appliesTo: "cart",
    productId: "",
    expiryDate: "",
    minCartValue: 0,
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let v = value;

    if (name === "isActive") v = type === "checkbox" ? checked : value === "true";
    if (name === "discountValue" || name === "minCartValue") v = Number(value);

    setFormData((prev) => ({ ...prev, [name]: v }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ sanitize before sending
    const payload = {
      ...formData,
      id: crypto.randomUUID?.() || String(Date.now()),
      discountValue: Number(formData.discountValue),
      minCartValue: Number(formData.minCartValue) || 0,
      expiryDate: new Date(formData.expiryDate), // ✅ convert to Date
    };

    onCouponAdded(payload);

    // reset form
    setFormData({
      id: "",
      code: "",
      discountType: "percentage",
      discountValue: "",
      appliesTo: "cart",
      productId: "",
      expiryDate: "",
      minCartValue: 0,
      isActive: true,
    });
  };

  return (
<form
  onSubmit={handleSubmit}
  className="flex flex-col items-start gap-3 w-full lg:w-1/2"
>
  <h2 className="text-lg font-bold text-center">Add New Coupon</h2>

  {/* Coupon Code */}
  <input
    name="code"
    placeholder="Coupon Code"
    value={formData.code}
    onChange={handleChange}
    className="border p-3 w-full rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
    required
  />

  {/* Discount Type + Discount Value */}
  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
    <select
      name="discountType"
      value={formData.discountType}
      onChange={handleChange}
      className="border p-3 w-full rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
    >
      <option value="percentage">Percentage (%)</option>
      <option value="fixed">Fixed Amount (₹)</option>
    </select>

    <input
      type="number"
      name="discountValue"
      placeholder="Discount Value"
      value={formData.discountValue}
      onChange={handleChange}
      className="border p-3 w-full rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
      required
    />
  </div>

  {/* Applies To + Product ID conditional */}
  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
    <select
      name="appliesTo"
      value={formData.appliesTo}
      onChange={handleChange}
      className="border p-3 w-full rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
    >
      <option value="cart">Cart</option>
      <option value="product">Specific Product</option>
    </select>

    {formData.appliesTo === "product" && (
      <input
        name="productId"
        placeholder="Enter Product ID"
        value={formData.productId}
        onChange={handleChange}
        className="border p-3 w-full rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
      />
    )}
  </div>

  {/* Expiry Date + Min Cart Value */}
  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
    <input
      type="date"
      name="expiryDate"
      value={formData.expiryDate}
      onChange={handleChange}
      className="border p-3 w-full rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
      required
    />

    <input
      type="number"
      name="minCartValue"
      placeholder="Min Cart Value (₹)"
      value={formData.minCartValue}
      onChange={handleChange}
      className="border p-3 w-full rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
    />
  </div>

  {/* Active Checkbox */}
  <label className="flex items-center gap-3 mt-2">
    <input
      type="checkbox"
      name="isActive"
      checked={!!formData.isActive}
      onChange={handleChange}
      className="h-5 w-5 text-green-600 rounded border-gray-300"
    />
    <span className="text-gray-700 font-medium">Active</span>
  </label>

  {/* Submit */}
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded w-full md:w-auto transition-colors duration-200"
  >
    Add Coupon
  </button>
</form>



  );
};

export default AddCoupon;
