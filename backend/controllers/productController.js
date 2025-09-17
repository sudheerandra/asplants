import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import productModel from "../models/productModel.js";
import reviewModel from "../models/ReviewModel.js";

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

// Function to list products with review stats
const listProducts = async (req, res) => {
  try {
    // 1️⃣ Fetch all products
    const products = await productModel.find({});

    // 2️⃣ Aggregate review stats for each product
    const reviewStats = await reviewModel.aggregate([
      {
        $group: {
          _id: "$productId",
          totalReviews: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    // 3️⃣ Map stats to products
    const productsWithStats = products.map((product) => {
      const stats = reviewStats.find(
        (r) => r._id.toString() === product._id.toString()
      );
      return {
        ...product._doc, // preserve original product fields
        totalReviews: stats ? stats.totalReviews : 0,
        avgRating: stats ? stats.avgRating : 0,
      };
    });

    res.status(200).json({ success: true, products: productsWithStats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
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