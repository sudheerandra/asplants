import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-1">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
       <NavLink
          className="flex items-center gap-4 border boder-gray-600 border-r-0 px-3 py-2 rounded-1"
          to="/dashboard"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Dash Board</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-4 border boder-gray-600 border-r-0 px-3 py-2 rounded-1"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-4 border boder-gray-600 border-r-0 px-3 py-2 rounded-1"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-4 border boder-gray-600 border-r-0 px-3 py-2 rounded-1"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-4 px-3 py-2 rounded border-gray-600 ${
              isActive
                ? "bg-orange-200 text-black-700 font-semibold"
                : "border border-gray-600"
            }`
          }
          to="/coupons"
        >
          <img
            className="w-5 h-5"
            src={assets.coupon_icon || assets.add_icon}
            alt="Coupons"
          />
          <p className="hidden md:block">Coupons</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-4 px-3 py-2 rounded border-gray-600 ${
              isActive
                ? "bg-orange-200 text-black-700 font-semibold"
                : "border border-gray-600"
            }`
          }
          to="/search"
        >
          <img
            className="w-5 h-5"
            src={assets.search_icon || assets.order_icon}
            alt="Search Orders"
          />
          <p className="hidden md:block">Search Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
