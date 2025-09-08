import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const SearchOrders = ({ token }) => {
  const [searchType, setSearchType] = useState("orderId");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/order/search?${searchType}=${searchValue}`,
        { headers: { token } }
      );
      setResults(res.data);
      setSearchValue("");
    } catch (err) {
      alert(err.response?.data?.message || "Error searching orders");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <span role="img" aria-label="search">
          🔍
        </span>{" "}
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
        </select>

        <input
          type="text"
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
        <div className="space-y-4">
          {[...results].reverse().map((order) => (
            <div
              key={order._id}
              className="p-4 border border-green-200 rounded-xl shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="font-semibold text-green-700 mb-2">
                Order ID:{" "}
                <span className="text-sm font-normal">{order._id}</span>
              </h2>
              <p className="text-sm text-gray-700">
                <span className="font-medium">User:</span> {order.userId}{" "}
                {order.address.firstName} ({order.address.email})
              </p>
              <p className="text-sm text-gray-700">
                Date:{" "}
                {new Date(order.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // AM/PM format
                })}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                {order.address.phone}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Total:</span> ₹{order.amount}
              </p>
              <p
                className={`text-sm font-medium ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {order.status}
              </p>

              {/* Products */}
              <div className="mt-3">
                <h4 className="font-semibold text-sm text-green-700 mb-1">
                  Products:
                </h4>
                <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                  {order.items.map((p, i) => (
                    <li key={i}>
                      {p.name} × {p.quantity} = ₹{p.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchOrders;
