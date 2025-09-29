import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App.jsx";

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // YYYY-MM

  // --- GET ALL ORDERS ---
  const getOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/orderslist",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, [token]);

  // --- SUMMARY CALCULATIONS ---
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
  const pendingOrders = totalOrders - deliveredOrders;

  // --- MONTHLY BREAKDOWN ---
  const monthlySales = {};
  orders.forEach((order) => {
    const month = new Date(order.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (!monthlySales[month]) {
      monthlySales[month] = { revenue: 0, orders: 0 };
    }
    monthlySales[month].revenue += order.amount;
    monthlySales[month].orders += 1;
  });

  // --- DAILY BREAKDOWN FOR SELECTED MONTH ---
  const getDailyStats = () => {
    if (!selectedMonth) return [];

    const dailyStats = {};
    orders.forEach((order) => {
      const dateObj = new Date(order.date);
      const orderMonth = dateObj.toISOString().slice(0, 7); // YYYY-MM

      if (orderMonth === selectedMonth) {
        const day = dateObj.getDate();
        const dayKey = `${day
          .toString()
          .padStart(2, "0")}-${dateObj.toLocaleString("default", {
          month: "short",
        })}`;

        if (!dailyStats[dayKey]) {
          dailyStats[dayKey] = { orders: 0, revenue: 0 };
        }
        dailyStats[dayKey].orders += 1;
        dailyStats[dayKey].revenue += order.amount;
      }
    });

    return Object.keys(dailyStats)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((day) => ({
        day,
        orders: dailyStats[day].orders,
        revenue: dailyStats[day].revenue,
      }));
  };

  const dailyData = getDailyStats();

  // --- Selected Month Totals ---
  const selectedMonthTotals = dailyData.reduce(
    (acc, d) => {
      acc.orders += d.orders;
      acc.revenue += d.revenue;
      return acc;
    },
    { orders: 0, revenue: 0 }
  );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-green-700">
        📊 Sales Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm sm:text-base">Total Orders</h3>
          <p className="text-xl sm:text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm sm:text-base">Total Revenue</h3>
          <p className="text-xl sm:text-2xl font-bold">₹{totalRevenue}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm sm:text-base">Delivered</h3>
          <p className="text-xl sm:text-2xl font-bold">{deliveredOrders}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500 text-sm sm:text-base">Pending</h3>
          <p className="text-xl sm:text-2xl font-bold">{pendingOrders}</p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <h3 className="text-base sm:text-lg font-semibold mb-4 flex flex-wrap items-center gap-2">
        📅 Monthly Sales
      </h3>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-[500px] w-full bg-white shadow rounded-lg text-sm sm:text-base">
          <thead>
            <tr className="bg-green-50 text-left">
              <th className="py-2 px-4">Month</th>
              <th className="py-2 px-4">Orders</th>
              <th className="py-2 px-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(monthlySales).map((month, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 px-4">{month}</td>
                <td className="py-2 px-4">{monthlySales[month].orders}</td>
                <td className="py-2 px-4">₹{monthlySales[month].revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Daily Breakdown for Selected Month */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <label className="font-medium">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
      </div>

      {selectedMonth && (
        <>
          {/* Month Summary */}
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <h4 className="text-green-700 font-semibold">
              {new Date(selectedMonth + "-01").toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}{" "}
              Summary
            </h4>
            <p>
              Total Orders:{" "}
              <span className="font-bold">{selectedMonthTotals.orders}</span>
            </p>
            <p>
              Total Revenue:{" "}
              <span className="font-bold">₹{selectedMonthTotals.revenue}</span>
            </p>
          </div>

          <h3 className="text-base sm:text-lg font-semibold mb-4 flex flex-wrap items-center gap-2">
            📆 Daily Sales -{" "}
            {new Date(selectedMonth + "-01").toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-[500px] w-full bg-white shadow rounded-lg text-sm sm:text-base">
              <thead>
                <tr className="bg-green-50 text-left">
                  <th className="py-2 px-4">Day</th>
                  <th className="py-2 px-4">Orders</th>
                  <th className="py-2 px-4">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[...dailyData].reverse().map((d, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-4">{d.day}</td>
                    <td className="py-2 px-4">{d.orders}</td>
                    <td className="py-2 px-4">₹{d.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
