import express from "express";
import { addReview, getAllReviewStats, getReviews } from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

// POST: Add review
router.post("/", authUser, addReview);

// GET: Get reviews by product
router.get("/:productId", getReviews);

router.get("/allreviews", getAllReviewStats);

export default router;
