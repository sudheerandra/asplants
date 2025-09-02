import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import productModel from "../models/productModel.js";

// Fuction for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      bestseller,
    } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Generating ImageUrls from cloudinary website
    let imagesUrls = await Promise.all(
      images.map(async (item) => {
        let result = cloudinary.uploader.upload(item.path);
        return (await result).secure_url;
      })
    );

    // storing product data into Mongodb
    const productData = {
      name,
      description,
      price: +price,
      category,
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Fuction for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Fuction for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Fuction for single product info
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };