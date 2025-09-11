import React from "react";
import LatestCollection from "../components/LatestCollection";
import LatestBanner from "../components/LatestBanner";
import DeliveryPromise from "../components/DeliveryPromise";
import Bestseller from "../components/Bestseller";
import DiscountBanner from "../components/DiscountBanner";

const Home = () => {
  return (
    <div>
      <DiscountBanner
        title="Special Offer Just for You!"
        subtitle="Enjoy 10% OFF on all indoor plants this week 🌿"
        couponCode="Welcome10"
      />
      <LatestBanner />
      <DeliveryPromise />
      <LatestCollection />
      <Bestseller />
    </div>
  );
};

export default Home;
