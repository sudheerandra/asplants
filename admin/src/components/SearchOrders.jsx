import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const SearchOrders = ({ token }) => {
  const [searchType, setSearchType] = useState("orderId");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearch = async () => {
    try {
      if (searchType === "date") {
        const res = await axios.get(
          `${backendUrl}/api/order/summary?date=${searchValue}`,
          { headers: { token } }
        );
        setSummary(res.data.summary);
        setResults([]);
        setSelectedDate(searchValue); // ✅ Save searched date
      } else {
        const res = await axios.get(
          `${backendUrl}/api/order/search?${searchType}=${searchValue}`,
          { headers: { token } }
        );
        setResults(res.data);
        setSummary(null);
        setSelectedDate(null); // reset date
      }

      setSearchValue(""); // still clear the input box
    } catch (err) {
      console.error("Error searching orders:", err);
      toast.error(err.response?.data?.message || "Error searching orders");
    }
  };

  return (
   <div className="p-3 sm:p-6 max-w-4xl mx-auto">
  {/* Title */}
  <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-700 flex items-center gap-2">
    <span role="img" aria-label="search">🔍</span>
    Search Orders
  </h2>

  {/* Search Controls */}
  <div className="flex flex-col sm:flex-row gap-3 mb-6">
    <select
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
      className="border border-green-400 focus:ring-2 focus:ring-green-500 p-2 rounded-lg text-sm sm:text-base w-full sm:w-40"
    >
      <option value="orderId">Order ID</option>
      <option value="userId">User ID</option>
      <option value="date">Date</option>
    </select>

    <input
      type={searchType === "date" ? "date" : "text"}
      placeholder={`Enter ${searchType}`}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="border border-green-400 focus:ring-2 focus:ring-green-500 p-2 rounded-lg flex-1 text-sm sm:text-base"
    />

    <button
      onClick={handleSearch}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow text-sm sm:text-base w-full sm:w-auto"
    >
      Search
    </button>
  </div>

  {/* Results */}
  {results.length > 0 && (
    <div className="grid gap-4">
      {[...results].reverse().map((order) => (
        <div
          key={order._id}
          className="p-4 border border-green-200 rounded-xl shadow-sm bg-white hover:shadow-md transition"
        >
          <h2 className="font-semibold text-green-700 mb-2 text-sm sm:text-base break-words">
            Order ID: <span className="font-normal">{order._id}</span>
          </h2>

          {/* Order Info Grid for mobile readability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-700">
            <p><span className="font-medium">User:</span> {order.userId}</p>
            <p><span className="font-medium">Name:</span> {order.address.firstName}</p>
            <p><span className="font-medium">Email:</span> {order.address.email}</p>
            <p><span className="font-medium">Phone:</span> {order.address.phone}</p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p><span className="font-medium">Total:</span> ₹{order.amount}</p>
            <p
              className={`font-medium ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Status: {order.status}
            </p>
          </div>

          {/* Products */}
          <div className="mt-3">
            <h4 className="font-semibold text-sm text-green-700 mb-1">Products:</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              {order.items.map((p, i) => (
                <li key={i} className="break-words">
                  {p.name} × {p.quantity} = ₹{p.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* ✅ Product-wise Summary */}
  {searchType === "date" && summary && (
    <div className="mt-8 p-4 border border-green-400 bg-green-50 rounded-xl shadow">
      <h3 className="text-base sm:text-lg font-bold text-green-700 mb-3">
        📦 Packing Summary for{" "}
        {selectedDate &&
          new Date(selectedDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
      </h3>
      <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base text-gray-800">
        {Object.entries(summary).map(([name, data]) => (
          <li key={name} className="font-medium break-words">
            {name} →{" "}
            <span className="text-green-700">
              {data.quantity} pcs
            </span>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
};

export default SearchOrders;
