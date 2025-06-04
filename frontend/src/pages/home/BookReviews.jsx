import React, { useState, useEffect } from 'react';
import './css/BookReviews.css'; // Ensure CSS is correctly imported

const BookReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookReviews = async () => {
            try {
                const response = await fetch('https://nft-integrated-mern-bookstore-6mvs.vercel.app/api/book-reviews');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setReviews(data.reviews.slice(0, 7)); // Limit to 7 reviews
                setLoading(false);
            } catch (error) {
                setError("Failed to load book reviews.");
                setLoading(false);
            }
        };

        fetchBookReviews();
    }, []);

    if (loading) return <p>Loading book reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="book-reviews-container">
            <h2>Book Reviews</h2>
            <div className="reviews-grid">
                {reviews.map((review, index) => {
                    // Fallback image
                    const imageUrl = review.media?.[0]?.["media-metadata"]?.[0]?.url || "https://via.placeholder.com/300";

                    return (
                        <div className="review-item" key={index}>
                            <img src={imageUrl} alt={review.title} className="review-image" />

                            <div className="review-content">
                                <a href={review.url} target="_blank" rel="noopener noreferrer">
                                    <h3 className="review-title">{review.title}</h3>
                                </a>
                                <p className="review-summary">{review.abstract}</p>
                                {review.author && <p className="review-author">By {review.author}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookReviews;
