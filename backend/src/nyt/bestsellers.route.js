const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => { // Changed from '/nyt-bestsellers' to '/'
    try {
        const response = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

console.log("NYT Route Loaded");


module.exports = router;
