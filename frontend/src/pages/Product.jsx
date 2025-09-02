import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { assests } from "../assets/assests";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import axios from "axios";
import PlantCareGuide from "../components/PlantCartGuide";


const Product = () => {
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [newReview, setNewReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get(
        backendUrl + "/api/reviews/" + productId
      );
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
      setReviewCount(data.reviewCount);
    };
    fetchReviews();
  }, [productId]);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products,productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                key={index}
                src={item}
                 alt={productData.name}
              
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] group">
            <img
              className="w-full aspect-square object-cover rounded-lg 
                transition-transform duration-300 ease-in-out 
                group-hover:scale-110 group-hover:shadow-lg group-hover:opacity-90"
              src={image}
               alt={productData.name}
              
            />
          </div>
        </div>
        {/* .............Product info------------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt:2">{productData.name}</h1>
          <div className="flex gap-2 mt-2 items-center">
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
          <p className="mt-5 font-medium text-2xl">
            {currency} {productData.price}
          </p>
          <p className="mt-3 text-gray-500 md:w-4/5 font-medium">
            {productData.description}
          </p>

          <button
            onClick={() => addToCart(productData._id)}
            className="bg-green-600 text-white px-4 py-2 mt-3 rounded-lg shadow-md 
             hover:bg-green-700 active:bg-green-800 transition duration-200"
          >
            ADD TO CART
          </button>
          <hr className="mt-3 sm:w-4/5" />
          <div className="flex flex-col gap-2 mt-2">
            <p>Long-lasting, vibrant greenery backed by AS Plants quality</p>
            <p>Eco-friendly packaging for safe delivery</p>
            <p>Low-maintenance, beginner-friendly options</p>
          </div>
        </div>
      </div>
      {/* ............. Description & Reviews ................ */}
      <div className="flex gap-5">
        <button
          onClick={() => setActiveTab("description")}
          className={`border p-2 mt-3 ${
            activeTab === "description" ? "bg-green-100 font-bold " : ""
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`border p-2 mt-3 ${
            activeTab === "reviews" ? "bg-green-100 font-bold" : ""
          }`}
        >
          Reviews
        </button>
      </div>
      {activeTab === "description" ? (
        <PlantCareGuide productData={productData}/>
      ) : (
        <div className="border p-4">
          <ReviewForm
            productId={productData._id}
            onReviewAdded={setNewReview}
          />
          <ReviewList productId={productData._id} newReview={newReview} />
        </div>
      )}

      {/* .............. Related Products .................... */}
      <RelatedProducts
        category={productData.category}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
