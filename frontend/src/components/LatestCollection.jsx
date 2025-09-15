import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { assests } from "../assets/assests";

const LatestCollection = () => {
  const { products} = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  

  useEffect(() => {
    setLatestProducts(products.slice(0, 5));
  }, [products]);

  const handleScroll = () => {
    if (scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="my-2">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          <b>✨ Fresh arrivals for plant lovers</b>{" "}
          <span>
            Bring home the newest additions from <b>AS Plants!</b> Our latest
            collection is carefully handpicked to match every home and workspace
            — from lush indoor greens to exotic ornamentals.
          </span>
        </p>
      </div>
      {/* Rendering products */}
      <div
        onClick={handleScroll}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:gird-cols-4 gap-4 gap-y-6"
      >
        {latestProducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            reviewCount={item.reviewCount}
            avgRating={item.avgRating}
          />
        ))}
        
      </div>
    </div>
  );
};

export default LatestCollection;
