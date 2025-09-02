import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const shipping = subtotal === 0 ? 0 : Number(delivery_fee);
  const total = subtotal + shipping;

  return total === 0 ? null :  (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-gradient-to-br from-green-100 to-yellow-50 shadow-lg rounded-lg border border-green-200">
      <div className="mb-6 text-center">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>
      <div className="space-y-4 text-sm sm:text-base">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p className="text-gray-600 font-medium">Subtotal</p>
          <p className="font-semibold text-orange-700">
            {currency}
            {subtotal}.00
          </p>
        </div>
        <hr />
        {/* Shipping Fee */}
        {shipping > 0 && (
          <div className="flex justify-between">
            <p className="text-gray-600 font-medium">Shipping Fee</p>
            <p className="font-semibold text-orange-700">
              {currency}
              {delivery_fee}
            </p>
          </div>
        )}
        {/* Total */}
        <div className="flex justify-between font-bold text-lg sm:text-xl text-orange-900 border-t pt-4 transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
          <p>Total</p>
          <p>
            {currency}
            {total}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;