import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { assests } from "../assets/assests";

const ProductItems = ({
  id,
  name,
  price,
  image,
  scrollToTop = false,
  reviewCount,
  avgRating,
}) => {
  const { currency, unavailablePlants  } = useContext(ShopContext);
  const isAvailable = !unavailablePlants.includes(name);

  return (
   <div className={`relative ${!isAvailable ? "opacity-50 pointer-events-none" : ""}`}>
     <Link
      className="text-gray-700 cursor-pointer block group"
      to={`/product/${id}`}
      onClick={() =>
        scrollToTop && window.scrollTo({ top: 0, behavior: "smooth" })
      }
    >
    
      {/* RELATED PRODUCTS */}
      <div className="overflow-hidden">
        <LazyLoadImage
          className="w-full aspect-square object-cover rounded-lg 
             transition-transform duration-300 ease-in-out 
             group-hover:scale-110 group-hover:shadow-lg group-hover:opacity-90"
          src={image[0]}
          alt=""
          effect="blur"
        />
          {/* Overlay for unavailable products */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center rounded-lg">
              {/* Small Disabled Icon */}
              <div className="w-8 h-8 border-2 border-gray-500 rounded-full relative mb-2">
                <div className="absolute inset-0 bg-gray-500 rotate-45 origin-center transform"></div>
              </div>
              <p className="text-gray-700 font-semibold text-sm">Currently Unavailable</p>
            </div>
          )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="font-medium text-sm">
        {currency}
        {price}
      </p>
      {/* Rating */}
      <div className="flex gap-2 items-center">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={
              i < Math.round(avgRating)
                ? assests.star_icon
                : assests.star_dull_icon
            }
            alt=""
            className="w-3.5"
          />
        ))}
        <p className="pl-2">({reviewCount})</p>
      </div>

    </Link>
    
   </div>
  );
};

export default ProductItems;
