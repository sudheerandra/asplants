import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = (props) => {
  const { token } = props;
 
  const [listProducts, setListProducts] = useState([]);

  //GET PRODUCTSLIST DATA FROM BACKEND
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    // console.log("RESPONSE.....", response.data.products);
  };

  // Remove product from table
  const remvoeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await getProductData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="w-full">
    <h1 className="text-orange-600 text-center font-bold m-3">Products List - {listProducts.length}</h1>
  {listProducts.length > 0 ? (
    <div>
      {/* 📱 Mobile: Card layout */}
      <div className="space-y-4 md:hidden">
        {listProducts.map((item, index) => (
          <div
            key={index}
            className="border border-orange-300 rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-orange-600">{item.name}</h3>
              <span className="font-bold text-gray-700">₹{item.price}</span>
            </div>

            <div className="text-sm text-gray-600 mt-1">
              <p><span className="font-medium">Category:</span> {item.category}</p>
              <p><span className="font-medium">Bestseller:</span> {item.bestseller ? "Yes" : "No"}</p>
            </div>

            {item.image && item.image.length > 0 && (
              <div className="mt-3">
                <a
                  href={item.image[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-40 object-cover border border-orange-300 rounded"
                  />
                </a>
              </div>
            )}

            <button
              onClick={() => remvoeProduct(item._id)}
              className="mt-3 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* 💻 Desktop: Table layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-orange-400 rounded-lg text-sm sm:text-base">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Bestseller</th>
              <th className="px-4 py-2 text-left">Images</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {listProducts.map((item, index) => (
              <tr
                key={index}
                className="border-b border-orange-300 hover:bg-orange-100 transition-colors duration-300"
              >
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">₹{item.price}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.bestseller ? "Yes" : "No"}</td>
                <td className="px-4 py-2">
                  {item.image && item.image.length > 0 && (
                    <a
                      href={item.image[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover border border-orange-300 rounded hover:scale-105 transition-transform"
                      />
                    </a>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => remvoeProduct(item._id)}
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : null}
</div>

    
  );
};

export default List;