import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App.jsx";
import { assets } from "../assets/assets.js";

const Orders = (props) => {
  const { token, currency } = props;
  const [orders, setOrders] = useState([]);

  //---- GET ALL ORDERS FORM BACKEND API -------
  const getOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/orderslist",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, [token]);

  //......... GET ORDER STATUS FORM SELECT TAG -----------------
  const statusHandler = async (e, orderId) => {
    const status = e.target.value;
    //console.log(status, orderId)
    try {
      const response = await axios.post(
        backendUrl + "/api/order/updateorderstatus",
        { orderId, status },
        { headers: { token } }
      );
      if (response.data.success) {
        await getOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  return (
    <div>
      <h3>Orders List</h3>
      {/* Displaying item properties */}
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start border-2 border-gray-800 p-5 md:p-8 rounded-lg text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <div>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <img className="w-12" src={assets.parcel_icon} alt="" />
                {/* Displying ItemInfo ----  itemname, quantity, size */}
                <div style={{ padding: "0 10px" }}>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity},
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div>
              {/* Customer Address Info --- name, state, city, county, zipcode, phone*/}
              <div>
                <p className="mt-1 mb-2 font-bold">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.pincode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              {/* Displaying OrderInfo --- numberofItems, PaymentMethod, PaymentStatus, Date */}
              <div>
                <p className="sm:text-[15px] text-sm mt-2">
                  Items: {order.items.length}
                </p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>OrderId : {order._id} </p>
                <p
                  className={`font-bold ${
                    new Date(order.date).toDateString() ===
                    new Date().toDateString()
                      ? "text-red-700"
                      : "text-green-500"
                  }`}
                >
                  Date: {new Date(order.date).toDateString()}
                </p>
              </div>
            </div>
            <div>
              <p className="sm:text-[15px] text-sm">
                {order.amount}
                {currency}
              </p>
            </div>
            <div>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="p-2 font-semibold"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
