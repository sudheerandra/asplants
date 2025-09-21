import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, token, setToken, navigate, setUser } =
    useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ------------- COLLECTING FORM FIELDS...............
  const fieldsHandler = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  // -------------- TOKEN IS AVAILABE NAVIGATE TO HOME PAGE ------------
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // ------------- SENDING PAYLOAD TO BACKEND APIS -----------------
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        // CALL REGISTER BACKEND API
        const response = await axios.post(
          backendUrl + "/api/user/register",
          fields
        );

        if (response.data.success) {
          //navigate("/login")
          setToken(response.data.token);
          setUser(response.data.name);
          localStorage.setItem("user", response.data.name);
          localStorage.setItem("token", response.data.token);
          setFields({ name: "", email: "", password: "" });
          toast.success("User Registered Successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // CALL LOGIN BACKEND API
        const response = await axios.post(
          backendUrl + "/api/user/login",
          fields
        );

        if (response.data.success) {
          navigate("/");
          setToken(response.data.token);
          setUser(response.data.name);
          localStorage.setItem("user", response.data.name);
          localStorage.setItem("token", response.data.token);
          setFields({ name: "", email: "", password: "" });
          //toast.success("User Logged In!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? null : (
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={fields.name}
          onChange={fieldsHandler}
          className="w-full px-2 py-3 border border-green-500"
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={fields.email}
        onChange={fieldsHandler}
        className="w-full px-2 py-3 border border-green-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={fields.password}
        onChange={fieldsHandler}
        className="w-full px-2 py-3 border border-green-500"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p
          onClick={() => navigate("/forgot-password")}
          className="cursor-pointer"
        >
          Forgot Your Password?
        </p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-green-800 rounded-full text-white border px-8 py-2">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
