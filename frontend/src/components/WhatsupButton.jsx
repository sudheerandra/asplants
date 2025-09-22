import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://wa.me/919381568173?text=Hi%20AS%20Plants%2C%20I%20want%20to%20buy%20a%20plant!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>

      {/* Tooltip */}
      <span className="absolute right-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-green-500 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap transition">
        Chat with us
      </span>
    </div>
  );
};

export default WhatsAppButton;
