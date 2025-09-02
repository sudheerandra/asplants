import React from "react";

const DeliveryPromise = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
      <div className="p-4 rounded-xl shadow-md bg-green-50 hover:scale-105 transition-transform duration-300">
        <h2 className="text-lg font-semibold text-green-700">🌱 Fresh</h2>
        <p className="text-sm mt-2">
          Every plant is nurtured in our nursery and shipped healthy & ready
          to thrive.
        </p>
      </div>
      <div className="p-4 rounded-xl shadow-md bg-green-50 hover:scale-105 transition-transform duration-300">
        <h2 className="text-lg font-semibold text-green-700">⚡ Fast</h2>
        <p className="text-sm mt-2">
          Orders are processed within 24–48 hours and delivered in 3–7 days.
        </p>
      </div>
      <div className="p-4 rounded-xl shadow-md bg-green-50 hover:scale-105 transition-transform duration-300">
        <h2 className="text-lg font-semibold text-green-700">🎁 Free</h2>
        <p className="text-sm mt-2">
          Enjoy <b>FREE delivery</b> on all orders, no hidden charges ever!
        </p>
      </div>
    </div>
  );
};

export default DeliveryPromise;
