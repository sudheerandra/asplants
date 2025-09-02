import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title";
import ProductItems from "./ProductItems.jsx";

const Bestseller = () => {
  const { products} = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestproduct = products.filter((item) => item.bestseller);
    setBestSeller(bestproduct.slice(0, 5));
  }, [products]);

  const handleScroll = () => {
    if (scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
  }

  return (
    <div className="my-2">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          <b>🌟 Customer favorites you’ll love too</b> <span>Discover the plants that everyone is talking about! Our bestsellers are loved by hundreds of happy plant parents for their beauty, easy care, and the positive vibes they bring.</span>
        </p>
      </div>
      <div onClick={handleScroll} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-7">
        {bestSeller.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;