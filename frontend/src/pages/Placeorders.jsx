import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { assests } from "../assets/assests";
import Loader from "../components/Loader";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    delivery_fee,
    getFinalAmount,
    discount,
    clearCoupon,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [isPaying, setIsPaying] = useState(false);
  const [loading, setLoading] = useState(false); // new state

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChageHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScroll = () => {
    if (scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const initRazor = (order) => {
    setIsPaying(true);
    setLoading(true); // ✅ show loader
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "AS Plants Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        //console.log("initRazor......",response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success(data.message);
            navigate("/orders");
            setCartItems({});
            clearCoupon(); // ✅ reset coupon
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        } finally {
          setIsPaying(false);
          setLoading(false);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () => {
      setIsPaying(false);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    });
    rzp.open();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === itemId)
          );

          if (itemInfo) {
            itemInfo.quantity = cartItems[itemId]; // add quantity only
            orderItems.push(itemInfo);
          }
        }
      }
      //console.log("ORDER INFO.......", orderItems);

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getFinalAmount(),
        discount,
        delivery_fee,
      };

      switch (method) {
        //API CALL FOR COD
        case "cod":
          try {
            setIsPaying(true);
            setLoading(true);
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              setCartItems({});
              clearCoupon(); // ✅ reset coupon
              if (setFormData) {
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  street: "",
                  city: "",
                  state: "",
                  pincode: "",
                  country: "",
                  phone: "",
                });
              }
              navigate("/orders");
              toast.success(response.data.message);
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error(err.response?.data?.message || "Error placing order");
          } finally {
            setIsPaying(false);
            setLoading(false);
          }

          break;

        //API CALL FOR RAZORPAY
        case "razorpay":
          const razorpayResponse = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (razorpayResponse.data.success) {
            // Open Razorpay popup
            initRazor(razorpayResponse.data.order);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col lg:flex-row justify-between gap-8  sm:pt-14 min-h-[80vh] border-t"
    >
      {/* //////////// Left: Delivery Info //////////// */}
      <div className="flex-1 max-w-full lg:max-w-[500px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {/* Delivery Form */}
        <div className="flex gap-3">
          <input
            className="border border-green-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            onChange={onChageHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            className="border border-green-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            onChange={onChageHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>

        <input
          className="border border-green-300 rounded py-1.5 px-3.5 w-full mt-3"
          type="email"
          placeholder="Email address"
          onChange={onChageHandler}
          name="email"
          value={formData.email}
          required
        />

        <input
          className="border border-green-300 rounded py-1.5 px-3.5 w-full mt-3"
          type="text"
          placeholder="Street"
          onChange={onChageHandler}
          name="street"
          value={formData.street}
          required
        />

        <div className="flex gap-3 mt-3">
          <input
            className="border border-green-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            onChange={onChageHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            className="border border-green-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            onChange={onChageHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>

        <div className="flex gap-3 mt-3">
          <input
            className="border border-green-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="PINCode"
            onChange={onChageHandler}
            name="pincode"
            value={formData.pincode}
            required
          />
          <input
            className="border border-green-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            onChange={onChageHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>

        <input
          className="border border-green-300 rounded py-1.5 px-3.5 w-full mt-3"
          type="number"
          placeholder="Phone"
          onChange={onChageHandler}
          name="phone"
          value={formData.phone}
          required
        />
      </div>

      {/* //////////// Right: Cart + Payment //////////// */}
      <div className="flex-1 max-w-full lg:max-w-[400px]">
        <div className="sticky top-24">
          <CartTotal />

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            {/* Payment Method Selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div className="flex items-center gap-3 border border-green-600 p-2 px-3 cursor-pointer rounded-md">
                <p
                  onClick={() => setMethod("razorpay")}
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img className="h-3 mx-4" src={assests.razorpay_icon} alt="" />
              </div>

              <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md">
                <p
                  onClick={() => setMethod("cod")}
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            {/* Proceed Button */}
            <div onClick={handleScroll} className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-green-600 text-white rounded-full text-sm  px-8 py-3"
              >
                PROCEED TO PAY
              </button>
              {loading && (
                <Loader message="Processing your payment... Please wait 🌱" />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
