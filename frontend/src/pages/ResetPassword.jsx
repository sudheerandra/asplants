import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";


const ResetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const { resetPassword } = useContext(ShopContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(id, token, password);
    setPassword("");
  };
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;