const express = require("express");
const axios = require("axios");
const router = express.Router();

const NYT_API_KEY = process.env.NYT_API_KEY; // Ensure this is in your .env file

// Fetch NYT Bestsellers and Books-related articles
router.get("/", async (req, res) => {
    try {
        // Fetch NYT Bestsellers
        const bestsellersResponse = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`
        );

        // Fetch Books-related News
        const newsResponse = await axios.get(
            `https://api.nytimes.com/svc/topstories/v2/books.json?api-key=${NYT_API_KEY}`
        );

        const bestsellers = bestsellersResponse.data.results.books;
        const newsArticles = newsResponse.data.results;

        // Extract relevant book titles from bestsellers
        const trendingTitles = bestsellers.map(book => book.title.toLowerCase());

        // Find articles that mention these books
        const trendingNews = newsArticles.filter(article =>
            trendingTitles.some(title => article.title.toLowerCase().includes(title) || article.abstract.toLowerCase().includes(title))
        );

        // Create a trend summary
        const trendSummary = {
            message: `Trending: ${trendingTitles.slice(0, 3).join(", ")} are making waves!`,
            books: bestsellers.slice(0, 5),
            news: trendingNews.slice(0, 3),
        };

        res.json(trendSummary);
    } catch (error) {
        console.error("Error fetching trending books:", error);
        res.status(500).json({ error: "Failed to fetch trending books" });
    }
});

module.exports = router;
