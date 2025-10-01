import { ShopContext } from "../context/ShopContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  //console.log("ORDER DATA..", orderData);
  
  const getOrdersData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderAmount"] = order.amount;
            item["discount"] = order.discount || 0;
            item["delivery_fee"] = order.delivery_fee || 0;
            allOrders.push(item);
          });
        });
        //console.log("ALL ORDERS....", allOrders);
        setOrderData(allOrders.reverse());
        //toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  //console.log("ALL ORDERS...", orderData);

  useEffect(() => {
    if (token) {
      getOrdersData();
    }
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-8">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
          >
            {/* Product Info */}
            <div className="flex gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />

              <div className="space-y-1">
                <p className="font-semibold text-base text-gray-800">
                  {item.name}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <p>
                    {currency}
                    {item.orderAmount}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Payment:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
                <p className="text-sm text-gray-500"><span className="text-gray-400">Payment Status: {item.payment? "Done" : "Pending" }</span></p>
              </div>
            </div>

            {/* Status + Button (Always stay aligned) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 md:min-w-[280px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm text-green-700 font-medium">
                  {item.status}
                </p>
              </div>
              <button
                onClick={getOrdersData}
                className="px-4 py-2 text-sm font-semibold border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-md transition"
              >
                TRACK MY ORDER
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
