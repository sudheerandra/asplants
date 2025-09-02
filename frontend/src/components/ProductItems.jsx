import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductItems = ({ id, name, price, image, scrollToTop = false }) => {
  const { currency } = useContext(ShopContext);
  const Navigate = useNavigate();
  const handleScroll = () => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    Navigate(`/product/${id}`);
  };
  return (
    <Link
      className="text-gray-700 cursor-pointer block group"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden" onClick={handleScroll}>
        <LazyLoadImage
          className="w-full aspect-square object-cover rounded-lg 
             transition-transform duration-300 ease-in-out 
             group-hover:scale-110 group-hover:shadow-lg group-hover:opacity-90"
          src={image[0]}
          alt=""
          effect="blur"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="font-medium text-sm">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItems;
