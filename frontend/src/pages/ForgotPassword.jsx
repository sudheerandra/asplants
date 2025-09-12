import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const ForgotPassword = () => {
   
  const {email, setEmail, forgotPassword} = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      await forgotPassword(email); // wait for async function
    } finally {
      setLoading(false); // stop loader
      setEmail("");
    }
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
          disabled={loading}
          className="bg-green-500 text-white py-2 rounded disabled:opacity-70"
        >
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;