import React, { useEffect } from "react";
import { assests } from "../assets/assests";
import { Link, useLocation } from "react-router-dom";

import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-green-50 text-gray-700 mt-4">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 px-6 py-12">
        {/* Logo & About */}
        <div>
          <img src={assests.logo} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mr-4" alt="AS Plants Logo" />
          <p className="leading-relaxed tracking-wide text-justify text-gray-600">
            At <b className="text-green-700">AS Plants</b>, we believe every
            home deserves the freshness and positivity of green life.We are a modern nursery-to-home ecommerce brand, bringing you <b>healthy, hand-nurtured plants</b> delivered with care. From air-purifying indoor greens to ornamental favorites and lucky charm plants, our collection is curated to suit every lifestyle.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-semibold text-lg text-gray-900 mb-4">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-green-600 transition-colors duration-200">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:text-green-600 transition-colors duration-200">
              <Link to={"/about"}>About Us</Link>
            </li>
            <li className="hover:text-green-600 transition-colors duration-200">
              <Link to={"/delivery"}>Delivery</Link>
            </li>
            <li className="hover:text-green-600 transition-colors duration-200">
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
            </li>
            <li className="hover:text-green-600 transition-colors duration-200">
              <Link to={"/terms-and-conditions"}>Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <p className="font-semibold text-lg text-gray-900 mb-4">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-600" />
              +91 9381568173
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-600" />
              asplants.in@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 py-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <Twitter className="w-5 h-5" />
        </a>
      </div>

      {/* Divider & Copyright */}
      <div className="px-6 sm:px-10">
        <hr className="border-t border-gray-300" />
        <p className="text-center text-sm text-gray-600 py-6">
          © 2025 <span className="font-medium text-green-700">AS Plants</span>.
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
