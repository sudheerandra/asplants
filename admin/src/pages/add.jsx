import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = (props) => {
  const { token } = props;
  // form data
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    category: "Indoor",
    bestseller: false,
  });

  // to stroe images files
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // to preview images on page
  const [preview, setPreview] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // Images handling
  const imageFilesHandler = (e) => {
    e.preventDefault();
    const { id, files } = e.target;
    const file = files[0];
    if (file) {
      setImages((prevImages) => ({
        ...prevImages,
        [id]: file,
      }));
      setPreview((prevPreview) => ({
        ...prevPreview,
        [id]: URL.createObjectURL(file),
      }));
    }
  };

  const fieldsHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const bestsellerHandler = (e) => {
    setFormState((prev) => ({
      ...prev,
      bestseller: e.target.checked,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("description", formState.description);
      formData.append("category", formState.category);
      formData.append("price", formState.price);
      formData.append("bestseller", formState.bestseller);

      // Append images only if selected
      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      //console.log("RES...",response);
      //console.log("product data",response.data)

      if (response.data.success) {
        toast.success(response.data.message);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Reset form
        setFormState({
          name: "",
          description: "",
          price: "",
          category: "Men",
          bestseller: false,
        });

        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });

        setPreview({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* IMAGE UPLOADS */}
      <div>
        <p className="mb-2">Image Upload</p>
        <div className="flex gap-3">
          {["image1", "image2", "image3", "image4"].map((id) => (
            <label htmlFor={id} key={id}>
              <img
                className="w-20"
                src={preview[id] || assets.upload_area}
                alt=""
              />
              <input onChange={imageFilesHandler} type="file" id={id} hidden />
            </label>
          ))}
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here..."
          required
          onChange={fieldsHandler}
          name="name"
          value={formState.name}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here..."
          required
          onChange={fieldsHandler}
          name="description"
          value={formState.description}
        />
      </div>

      {/* PRODUCT-CATEGEORY, SUBCATEGORY, PRICE */}
      <div className="flex flex-col gap-2 sm:flex-row w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            name="category"
            value={formState.category}
            onChange={fieldsHandler}
            className="w-full px-3 py-2 border"
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Fruits">Fruits</option>
            <option value="Flowers">Flowers</option>
            <option value="Creepers">Creepers</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="ex:25"
            onChange={fieldsHandler}
            name="price"
            value={formState.price}
          />
        </div>
      </div>

      {/* PRODUCT-SIZES */}
      {/* <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-2">
          {sizeOptions.map((size) => (
            <div key={size}>
              <p
                onClick={() => sizeHandler(size)}
                className={`cursor-pointer px-3 py-1 ${
                  formState.sizes.includes(size)
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      {/* BESTSELLER */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={bestsellerHandler}
          type="checkbox"
          id="bestseller"
          checked={formState.bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      {/* SUBMIT BUTTON */}
      <div>
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-orange-500"
          type="submit"
        >
          ADD
        </button>
      </div>
    </form>
  );
};

export default Add;
