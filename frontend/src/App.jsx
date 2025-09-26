import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/Placeorders";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import Login from "./pages/login";
import VerifyPayment from "./pages/VerifyPayment";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Delivery from "./pages/Delivery";
import "./index.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import ProtectedRoute from "./protectRoutes/ProtectedRoute";
import MyProfile from "./pages/MyProfile";



const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/myprofile" element={<MyProfile/>} />
        <Route path="/orders"  element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
        <Route path="/verify" element={<VerifyPayment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
