import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

// POST: Add review
router.post("/", authUser, addReview);

// GET: Get reviews by product
router.get("/:productId", getReviews);

export default router;
