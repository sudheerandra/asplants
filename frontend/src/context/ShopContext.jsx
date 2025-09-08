import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
//import { productsData } from "../assets/assests";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  //const currency = "$";
  const currency = "₹";
  const delivery_fee = 10;
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [email, setEmail] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [loadingToken, setLoadingToken] = useState(true);

  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);


  // ------------ GET ALL PRODUCTS FROM BACKEND URL ------------------
  const getProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      //console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //------------ GET USER CART DATA FORM BACKEND URL -------------------
  const getUserCartData = async (token) => {
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/getusercart",
          {},
          { headers: { token } }
        );
        //console.log("USER CART DATA.......", response.data);
        if (response.data.success) {
          setCartItems(response.data.cartdata);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/coupons`);
      setCoupons(data.filter((c) => c.isActive)); // only active coupons
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch coupons");
    }
  };

  const applyCoupon = async (code) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/coupons/apply",
        {
          code,
          cartAmount: getCartAmount(),
        },
        { headers: { token } }
      );

      if (response.data.success) {
        setDiscount(response.data.discountAmount);
        setAppliedCoupon(response.data.coupon);
        toast.success(`Coupon "${code}" applied! 🎉`);
      } else {
        setDiscount(0);
        setAppliedCoupon(null);
        toast.error(response.data.message || "Invalid coupon");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error applying coupon");
    }
  };

  const clearCoupon = () => {
  setDiscount(0);
  setAppliedCoupon(null);
};

  useEffect(() => {
    getProducts();
    fetchCoupons();
  }, []);

  // ---------------- WHEN PAGE IS REFRESHED USER LOGGED OUT ISSUE --------------------
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
      getUserCartData(storedToken);
    } else {
      localStorage.removeItem("token");
      setToken("");
    }
    setLoadingToken(false);
  }, []);

  //------------ ADD TO CART ---------------------
  const addToCart = async (itemId) => {
    if (!token) {
      toast.error("Please Loign");
    }
    setCartItems((prev) => {
      const quantity = prev[itemId] || 0;
      return { ...prev, [itemId]: quantity + 1 };
    });
    try {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  // -------------- CART COUNT by QUANTITY-----------
  const getCartCount = () => {
    let totalCount = 0;
    Object.entries(cartItems).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        totalCount += quantity;
      }
    });
    return totalCount;
  };

  // ----------- UPDATE QUANTITY IN DATABASE Cart Items ...................
  const updateQuantity = async (itemId, quantity) => {
    let cartdata = structuredClone(cartItems);
    cartdata[itemId] = quantity;
    setCartItems(cartdata);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ------------ CART AMOUNT CALCULATIONS ---------------------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const itemInfo = products.find((product) => product._id === id);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[id];
      }
    }
    return totalAmount;
  };

  const getFinalAmount = () => {
    const subtotal = getCartAmount();
    const shipping = subtotal === 0 ? 0 : delivery_fee;
    return Math.max(subtotal + shipping - discount, 0);
  };

  //------------- FORGOT PASSWORD -----------------
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/forgot-password",
        { email }
      );
      if (response.data.success) {
        toast.success("Reset Password Link Submitted");
        setEmail("");
      }

      //alert("Reset link sent to your email");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ------------------- RESET PASSWORD --------------------
  const resetPassword = async (id, token, password) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/reset-password/${id}/${token}`,
        { password }
      );
      console.log("forntend...", response.data);

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (discount > 0 && getCartAmount() < (appliedCoupon?.minCartValue || 0)) {
      setDiscount(0);
      setAppliedCoupon(null);
      toast.info("Coupon removed: Cart value below minimum");
    }
  }, [cartItems]);

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon("");
    setDiscount(0);
    toast.info("Coupon removed");
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    loadingToken,
    setLoadingToken,
    setToken,
    forgotPassword,
    resetPassword,
    email,
    setEmail,
    coupons,
    appliedCoupon,
    discount,
    applyCoupon,
    getFinalAmount,
    removeCoupon,
    clearCoupon
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
