// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {
  const { token, loadingToken } = useContext(ShopContext);
if (loadingToken) return <Loader message="Checking login..." />;
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the requested route
  return children;
};

export default ProtectedRoute;
