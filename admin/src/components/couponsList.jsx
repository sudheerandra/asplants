// src/components/admin/CouponList.jsx
import React from "react";
import { toBool } from "../utils/toBool";

const CouponList = ({ coupons, onDelete, onToggle }) => {
  return (
 <div className="mt-5">
  <h2 className="text-lg font-bold mb-3">All Coupons</h2>

  {coupons.length === 0 ? (
    <p className="text-gray-500">No coupons found</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-2 text-left">Code</th>
            <th className="border px-2 py-2 text-left">Type</th>
            <th className="border px-2 py-2 text-left">Value</th>
            <th className="border px-2 py-2 text-left">Applies To</th>
            <th className="border px-2 py-2 text-left">Expiry</th>
            <th className="border px-2 py-2 text-left">Min Cart</th>
            <th className="border px-2 py-2 text-center">Active</th>
            <th className="border px-2 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => {
            const active = toBool(c.isActive);
            return (
              <tr key={c.id || c._id} className="hover:bg-gray-50">
                <td className="border px-2 py-2">{c.code}</td>
                <td className="border px-2 py-2">{c.discountType}</td>
                <td className="border px-2 py-2">{c.discountValue}</td>
                <td className="border px-2 py-2">{c.appliesTo}</td>
                <td className="border px-2 py-2">{new Date(c.expiryDate).toLocaleDateString()}</td>
                <td className="border px-2 py-2">{c.minCartValue}</td>
                <td className="border px-2 py-2 text-center">{active ? "✅" : "❌"}</td>
                <td className="border px-2 py-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                  <button
                    onClick={() => onToggle(c.id || c._id)}
                    className={`px-2 py-1 rounded text-white ${
                      active ? "bg-yellow-500" : "bg-green-600"
                    }`}
                  >
                    {active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => onDelete(c.id || c._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</div>


  );
};

export default CouponList;
