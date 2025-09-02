import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🌿 Privacy Policy – AS Plants
      </h1>

      <p className="mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">
        At <b>AS Plants</b>, your privacy is very important to us. This Privacy
        Policy explains how we collect, use, and protect your personal
        information when you shop with us online or offline.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">We may collect the following information from you:</p>
      <ul className="list-disc pl-6 mb-4 my-8 p-6 bg-green-50">
        <li>Name, email, phone number, and shipping address</li>
        <li>Order history and payment details (processed securely)</li>
        <li>Feedback, reviews, or queries you share with us</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">
        <li>To process and deliver your plant orders</li>
        <li>To send order updates, offers, and plant care tips</li>
        <li>To improve our services and product collection</li>
        <li>To respond to your queries or concerns</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">
        We take your privacy seriously. Your data is stored securely, and
        payment transactions are encrypted through trusted payment gateways.
        <b> We never sell or rent your information</b> to third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
      <p className="mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">
        We only share your information with trusted partners like courier
        companies and payment providers, solely for order fulfillment purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
      <p className="mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">
        Our website may use cookies to enhance your browsing experience,
        remember your preferences, and analyze site traffic.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <ul className="list-disc pl-6 mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">
        <li>You can request access to the personal data we hold about you</li>
        <li>You may ask us to update or delete your information</li>
        <li>You can opt-out of promotional emails anytime</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to this Policy</h2>
      <p className="mb-4 mb-4 mb-4 my-8 p-6 bg-green-50">
        AS Plants may update this Privacy Policy from time to time. Any changes
        will be posted on this page with an updated date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p mb-4  my-8 p-6 bg-green-50>
        If you have any questions regarding this Privacy Policy, feel free to
        contact us at:
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

export default PrivacyPolicy;
