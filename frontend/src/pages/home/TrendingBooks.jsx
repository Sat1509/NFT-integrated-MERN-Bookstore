import { useEffect, useState } from "react";
import './css/TrendingBooks.css';

const CACHE_KEY = "trendingBooks";
const CACHE_EXPIRATION_KEY = "trendingBooksTimestamp";
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 2 minutes in milliseconds

const TrendingBooks = () => {
    const [trendingData, setTrendingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingBooks = async () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedTimestamp = localStorage.getItem(CACHE_EXPIRATION_KEY);

            // Check if cache exists and if it's still valid
            if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < CACHE_EXPIRATION_TIME) {
                // Use cached data
                setTrendingData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            // Fetch new data if cache is invalid or absent
            try {
                const response = await fetch("https://nft-integrated-mern-bookstore-6mvs.vercel.app/api/trending-books");
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Cache the new data and timestamp
                localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                localStorage.setItem(CACHE_EXPIRATION_KEY, Date.now().toString());

                setTrendingData(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load trending books.");
                setLoading(false);
            }
        };

        fetchTrendingBooks();
    }, []);

    if (loading) return <p>Loading trending books...</p>;
    if (error) return <p>{error}</p>;

    if (!trendingData) return <p>No data available.</p>;

    return (
        <div className="trending-books">
            <h2>📖 Trending Books & News</h2>
            <p>{trendingData.message}</p>

            <h3>Top Books</h3>
            <ul>
                {trendingData.books && trendingData.books.map((book, index) => (
                    <li key={index}>
                        <img src={book.book_image} alt={book.title} width="100" />
                        <div>
                            <h4>{book.title}</h4>
                            <p>by {book.author}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default TrendingBooks;
