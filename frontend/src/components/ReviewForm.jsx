import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { backendUrl, token } = useContext(ShopContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/reviews`,
        {productId,rating,comment},
        { headers: { token } }
      );
      onReviewAdded(data); // ✅ push new review to list
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitReview} className="flex flex-col gap-2 mb-4">
      <label className="font-semibold">Leave a Review</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border p-1 rounded"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} ★
          </option>
        ))}
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
