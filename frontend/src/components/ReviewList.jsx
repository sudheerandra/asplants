import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const ReviewList = ({ productId, newReview }) => {
  const { backendUrl } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/reviews/${productId}`);
        const reviewData = response.data; // no need for await

        if (reviewData.reviews && Array.isArray(reviewData.reviews)) {
          setReviews(reviewData.reviews);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, newReview]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews yet for this product.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-item">
            <p><strong>{review.name}</strong> says:</p>
            <p>{review.comment}</p>
            <p>Rating: {review.rating} / 5</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
