import mongoose from "mongoose";
import Review from "../models/ReviewModel.js";

// ✅ ADD REVIEW
 export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body; // read from body
    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = new Review({
      productId: String(productId), // ensure string
      name: req.body.userName,      // injected by authUser middleware
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error in addReview:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // ✅ no need for ObjectId conversion now
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    const stats = await Review.aggregate([
       { $match: { productId: String(productId) } }, // ✅ match string directly
      {
        $group: {
          _id: "$productId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      reviews,
      avgRating: stats[0]?.avgRating || 0,
      reviewCount: stats[0]?.count || 0,
    });
  } catch (error) {
    console.error("Error in getReviews:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all review stats for all products
export const getAllReviewStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: "$productId",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    res.json(stats); 
    // Example response:
    // [
    //   { _id: "productId1", avgRating: 4.5, reviewCount: 12 },
    //   { _id: "productId2", avgRating: 3.8, reviewCount: 5 }
    // ]
  } catch (error) {
    console.error("Error in getAllReviewStats:", error);
    res.status(500).json({ message: error.message });
  }
};

