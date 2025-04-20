const express = require("express");
const axios = require("axios");
const router = express.Router();

const NYT_API_KEY = process.env.NYT_API_KEY; // Ensure this is in your .env file

// Fetch NYT Book Reviews
router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.nytimes.com/svc/topstories/v2/books.json?api-key=${NYT_API_KEY}`
        );

        const bookReviews = response.data.results.map(article => ({
            title: article.title,
            summary: article.abstract,
            url: article.url, // This links to the full review on NYT
            published_date: article.published_date
        }));

        res.json({ reviews: bookReviews });
    } catch (error) {
        console.error("Error fetching NYT book reviews:", error);
        res.status(500).json({ error: "Failed to fetch book reviews" });
    }
});

module.exports = router;
