import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const { backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    };

    try {
      const res = await axios.post(`${backendUrl}/api/contact`, formData);

      if (res.data.success) {
        toast.success("Message sent successfully!");
        e.target.reset();
      } else {
        toast.error("⚠️ " + res.data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send message, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12 px-6 md:px-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
        📩 Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Contact Info */}
        <div className="flex-1 bg-green-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            🌱 Get in Touch with AS Plants
          </h3>
          <p className="text-gray-700 mb-3">
            Have a question, need help with your order, or just want to talk
            plants? We’d love to hear from you!
          </p>

          <div className="space-y-2 text-gray-800">
            <p>📍 <b>Address:</b> Dulla, India</p>
            <p>📞 <b>Phone:</b> +91 93815 68173</p>
            <p>✉️ <b>Email:</b> asplants.in@gmail.com</p>
            <p>⏰ <b>Hours:</b> Mon – Sat, 9am – 7pm</p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            ✨ Send us a Message
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-green-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-green-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="border border-green-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-200 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-green-700 active:bg-green-800"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
