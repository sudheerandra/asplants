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
  const [token, setToken] = useState("")

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

   useEffect(() => {
    getProducts();
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
  }, []);

  //------------ ADD TO CART ---------------------
  const addToCart = (itemId) => {
    if(!token){
      toast.error("Please Loign");
    }
    setCartItems((prev) => {
      const quantity = prev[itemId] || 0;
      return { ...prev, [itemId]: quantity + 1 };   
    });
  };

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => {
  //     const quantity = prev[itemId] || 0;
  //     if (quantity <= 1) {
  //       const updatedCart = { ...prev };
  //       delete updatedCart[itemId];
  //       return updatedCart;
  //     }
  //     return { ...prev, [itemId]: quantity - 1 };
  //   });
  // };


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


  //------------- FORGOT PASSWORD -----------------
  const forgotPassword = async (email) => {
    
    try {
      const response = await axios.post(backendUrl + "/api/user/forgot-password", { email });
      if(response.data.success){
        toast.success("Reset Password Link Submitted");
        setEmail("")
      }
      
      //alert("Reset link sent to your email");
    } catch (error) {
      console.log(error);
        toast.error(error.message);
    }
  }

  // ------------------- RESET PASSWORD --------------------
  const resetPassword = async (id, token, password) => {
    try {                                                      
      const response = await axios.post(`${backendUrl}/api/user/reset-password/${id}/${token}`, { password });
      console.log("forntend...", response.data);
      
      if(response.data.success){
           navigate("/login");
           toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
        toast.error(error.message);
    } 
  }
 

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
    setToken,
    forgotPassword,
    resetPassword,
    email, setEmail
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
