import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyPayment = () => {
  const { backendUrl, token, setCartItems, navigate } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  //http://localhost:5173/verify?success=true&orderId=689dded5a6053e8475d31aa2
  const success = searchParams.get("success"); // get from the abouve url after payment
  const orderId = searchParams.get("orderId"); // get from the abouve url after payment

  const VerifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      console.log("PAYMETN STATUS...", response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.error);
        navigate("/cart");
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
        
    }
  };

  useEffect(() => {
    VerifyPayment();
  }, [token]);

  return <div></div>;
};

export default VerifyPayment;