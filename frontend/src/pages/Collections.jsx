import React, { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItems from "../components/ProductItems.jsx";
import Title from "../components/Title.jsx";
import { assests } from "../assets/assests.js";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap12 sm:gap-10 pt-5 ">
      {/* Filters Options*/}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-green-700 font-semibold hover:text-green-600 transition-colors duration-300"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transform transition-transform duration-300 ${showFilters ? "rotate-90" : ""}`}
            src={assests.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filters */}
        <div
          className={`border border-green-200 rounded-lg shadow-sm bg-green-50 pl-5 py-4 mt-6 transition-all duration-500 ease-in-out ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3">CATEGORY</p>
          <div className="flex flex-col gap-2 font-semibold text-sm text-green-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Indoor"}
                onChange={toggleCategory}
              />
              Indoor
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Outdoor"}
                onChange={toggleCategory}
              />
              Outdoor
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Fruits"}
                onChange={toggleCategory}
              />
              Fruits
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Flowers"}
                onChange={toggleCategory}
              />
              Flowers
            </p>
             <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Creepers"}
                onChange={toggleCategory}
              />
              Creepers
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 mt-2">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-green-600 rounded-lg text-base mt-3"
          >
            <option value="relavent" className="bg-green-50" >sort by: relavent</option>
            <option value="low" className="bg-green-50">sort by: low - high</option>
            <option value="high" className="bg-green-50">sort by: high - low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItems
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
              price={item.price}
              reviewCount={item.reviewCount}
            avgRating={item.avgRating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
