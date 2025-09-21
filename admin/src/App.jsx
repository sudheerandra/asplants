import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import List from "./pages/list";
import Orders from "./pages/orders";
import Add from "./pages/add";
import CouponsPage from "./pages/coupons";
import SearchOrders from "./components/SearchOrders";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState("");
     const currency = '\u20B9'

  //getting token from localstroge for after refreshed user logout issue
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    } else {
      localStorage.removeItem("token");
      setToken("");
    }
  }, []);

  
  return (
    <div className="bg-gray-8 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route
                  path="/add"
                  element={token ? <Add token={token} /> : <Navigate to="/" />}
                />
                <Route path="/list" element={token ? <List token={token} /> : <Navigate to="/" />} />
                <Route path="/orders" element={<Orders token={token} currency={currency}/>} />
                <Route path="/coupons" element={<CouponsPage token={token} />} />
                <Route path="/search" element={<SearchOrders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;