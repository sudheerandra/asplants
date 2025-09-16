import React from "react";
import DeliveryPromise from "../components/DeliveryPromise";

const Delivery = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed  text-justify">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        🚚 Delivery Information – AS Plants
      </h1>

      {/* 🌟 Delivery Promise Section */}
      <DeliveryPromise />

      <p className="mb-4 text-justify my-8 p-6 bg-green-50">
        At <b>AS Plants</b>, we make sure your plants reach you fresh, healthy,
        and on time. Every order is packed with care and shipped securely to
        your doorstep.
      </p>

      <h2 className="text-xl font-semibold ">🌍 Delivery Coverage</h2>
      <p className="mb-4 my-8 p-6 bg-green-50">
        We deliver across India through our trusted courier and logistics
        partners. For remote or special locations, delivery timelines may vary.
      </p>

      <h2 className="text-xl font-semibold">⏳ Delivery Timelines</h2>
      <ul className="list-disc pl-6 mb-4 mb-4 my-8 p-6 bg-green-50">
        <li>Orders are processed within <b>24–48 hours</b>.</li>
        <li>
          Standard delivery time is usually <b>3–7 working days</b>, depending
          on your location.
        </li>
        <li>
          You’ll receive a tracking link via email/SMS once your order has been
          dispatched.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">📦 Packaging & Safety</h2>
      <p className="mb-4 mb-4 my-8 p-6 bg-green-50">
        Every plant is hand-nurtured in our nursery and shipped in{" "}
        <b>eco-friendly, protective packaging</b> designed to keep your greens
        fresh and safe during transit.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔎 Tracking Your Order</h2>
      <p className="mb-4 mb-4 my-8 p-6 bg-green-50">
        Once shipped, you’ll receive a tracking link to follow your order’s
        journey until it reaches your doorstep.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">❓ Need Help?</h2>
      <p className="mb-4">
        For delivery-related queries, you can reach out to us at:
      </p>
      <p className="font-semibold">
        📧 Email: asplants.in@gmail.com <br />
        📞 Phone: +91-9381568173
      </p>

      <p className="mt-6 text-sm text-gray-600 text-center">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Delivery;
