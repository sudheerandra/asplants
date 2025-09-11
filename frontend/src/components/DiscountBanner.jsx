import React, { useState } from "react";

const DiscountBanner = ({ title, subtitle, couponCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <div className="relative overflow-hidden  shadow-md h-[250px] sm:h-[300px] lg:h-[350px]">
      {/* Background image with animation */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-pan"
        style={{ backgroundImage: "url('/images.png')" }}
      ></div>

      {/* Softer overlay so leaves are clearer */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800 drop-shadow-md">
          {title}
        </h2>
        <p className="mt-2 text-black-700 text-sm sm:text-lg lg:text-xl drop-shadow">
          {subtitle}
        </p>

        {/* Coupon box - centered */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white border-2 border-green-600 px-4 py-2 rounded-lg shadow-lg">
          <span className="text-green-700 font-semibold text-base sm:text-lg">
            {couponCode}
          </span>
          <button
            onClick={handleCopy}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
