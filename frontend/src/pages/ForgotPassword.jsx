import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const ForgotPassword = () => {
   
  const {email, setEmail, forgotPassword} = useContext(ShopContext);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
    setEmail("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px:4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;