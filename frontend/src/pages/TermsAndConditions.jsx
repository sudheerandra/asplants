import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        📜 Terms & Conditions – AS Plants
      </h1>

      <p className="mb-4 mb-4 my-8 p-6 bg-green-50">
        Welcome to <b>AS Plants</b>! By accessing and shopping with us, you
        agree to the following terms and conditions. Please read them carefully
        before placing an order.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. General</h2>
      <p className="mb-4 my-8 p-6 bg-green-50">
        These terms apply to all purchases made from AS Plants, whether online
        or offline. We reserve the right to update these terms at any time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Orders & Payments</h2>
      <ul className="list-disc pl-6 mb-4 my-8 p-6 bg-green-50">
        <li>All orders are subject to availability and confirmation.</li>
        <li>
          Payments must be completed via our secure payment gateways before
          dispatch.
        </li>
        <li>
          Prices are listed in INR (₹) and may change without prior notice.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Shipping & Delivery</h2>
      <ul className="list-disc pl-6 mb-4 my-8 p-6 bg-green-50">
        <li>
          We deliver across India using trusted courier and logistics partners.
        </li>
        <li>
          Delivery timelines may vary depending on your location, weather, or
          courier delays.
        </li>
        <li>
          Customers are responsible for providing accurate shipping details. We
          are not liable for delays caused by incorrect addresses.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Returns & Refunds</h2>
      <ul className="list-disc pl-6 mb-4 my-8 p-6 bg-green-50">
        <li>
          Since plants are perishable, returns are accepted only in case of
          damage during delivery.
        </li>
        <li>
          Customers must share unboxing photos/videos within 24 hours of
          delivery to claim replacements.
        </li>
        <li>
          Refunds, if approved, will be processed to the original payment method
          within 7–10 working days.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Care Responsibility</h2>
      <p className="mb-4 my-8 p-6 bg-green-50">
        Plants require proper care after delivery. AS Plants is not responsible
        for plant health issues caused by neglect, unsuitable environments, or
        lack of care after delivery.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
      <p className="mb-4 my-8 p-6 bg-green-50">
        All content on our website, including images, descriptions, and logos,
        belongs to AS Plants and cannot be used without permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
      <p className="mb-4 my-8 p-6 bg-green-50">
        AS Plants is not liable for delays, damages, or losses caused by events
        beyond our control, such as natural disasters or courier failures.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p className="mb-4 my-8 p-6 bg-green-50">
        For any questions regarding these Terms & Conditions, contact us at:
      </p>
      <p className="mt-2 font-semibold">
        📧 Email: support@asplants.com <br />
        📍 Address: Hyderabad, India
      </p>

      <p className="mt-6 text-sm text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default TermsAndConditions;
