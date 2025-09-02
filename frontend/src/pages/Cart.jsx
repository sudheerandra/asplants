import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assests } from "../assets/assests";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate, token } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const handleScroll = () => {
    if (scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCheckout = () => {
    if (!token) {
      toast.error("Please login before proceeding to checkout!");
      navigate("/login"); // redirect to login page instead
      return;
    }
    navigate("/place-order"); // ✅ only if token exists
  };

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      Object.entries(cartItems).forEach(([itemId, quantity]) => {
        if (quantity > 0) {
          tempData.push({
            id: itemId,
            quantity: quantity,
          });
        }
      });
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // ✅ Check if cart is empty
  const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-xl font-medium text-gray-600">
            🛒 Your cart is empty
          </p>
          <Link
            to="/"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div>
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item.id
              );
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4  bg-green-50 hover:bg-green-100 transition-all duration-200 rounded-lg px-3"
                >
                  <div className="flex items-center">
                    <img
                      className="w-16 sm:w-20 rounded-md border border-gray-300 shadow-sm"
                      src={productData.image[0]}
                      alt=""
                    />
                    <div className="ml-4">
                      <p className="font-medium text-xs sm:text-lg text-orange-800">
                        {productData.name}
                      </p>
                      <div className="flex gap-4">
                        <p className="text-orange-700 font-semibold">
                          {currency}
                          {productData.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item.id, Number(e.target.value))
                    }
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-1 py-1 rounded text-center shadow-inner"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  <img
                    onClick={() => updateQuantity(item.id, 0)}
                    className="w-3 mr:4 sm:w-5 cursor-pointer hover:scale-110 transition-transform"
                    src={assests.bin_icon}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div onClick={handleScroll} className="w-full text-end">
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 text-white px-4 py-2 mt-3 rounded-full shadow-md 
             hover:bg-green-700 active:bg-green-800 transition duration-200"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
