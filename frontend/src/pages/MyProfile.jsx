import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const MyProfile = () => {
  const { user, userId, coupons } = useContext(ShopContext);
  const [userCoupons, setUserCoupons] = useState([]);

  useEffect(() => {
    if (coupons && userId) {
      setUserCoupons(coupons.filter((c) => c.userId === userId));
    }
  }, [coupons, userId]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-800">My Profile</h1>
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-gray-700 font-medium">
          Name: <span className="text-gray-900">{user}</span>
        </p>
        <p className="text-gray-700 font-medium">
          Id: <span className="text-gray-900">{userId}</span>
        </p>
      </div>
      <h1 className="text-xl font-bold mb-3 mt-3 text-green-800">My Coupons</h1>
      {userCoupons.length > 0 ? (
        <ul className="space-y-3">
          {userCoupons.map((c) => (
            <li key={c._id} className="p-3 border rounded-md bg-gray-50">
              <p className="font-semibold text-green-700">{c.code}</p>
              <p className="text-sm text-gray-600">
                {c.discountValue}
                {c.discountType === "percentage" ? "%" : "₹"} Discount on{" "}
                {c.appliesTo}
              </p>
              <p className="text-xs text-gray-500">
                Expires: {new Date(c.expiryDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No coupons assigned to you.</p>
      )}
    </div>
  );
};

export default MyProfile;
