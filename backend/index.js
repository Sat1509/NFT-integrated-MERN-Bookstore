const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5002;

// Middleware
app.use(express.json());

// Enable CORS with specific origins and credentials
app.use(cors({
    origin: ['http://localhost:5175', 'https://book-app-frontend-tau.vercel.app'],
    credentials: true,
    exposedHeaders: ['Authorization'] // This is important for cookies and sessions
}));
const admin = require("./config/firebaseAdmin");


// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/order/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

// NYT API Routes
const nytBestsellersRoute = require("./src/nyt/bestsellers.route");
const trendingBooksRoutes = require("./src/nyt/trendingBooks.route");
const bookReviews = require("./src/nyt/topArticles.route");

app.use("/api/nyt-bestsellers", nytBestsellersRoute);
app.use("/api/trending-books", trendingBooksRoutes);
app.use("/api/book-reviews", bookReviews);

// Existing API Routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// New Routes for Special Edition Books & NFT Claiming
const specialEditionRoutes = require("./src/specialEditions/specialEdition.route");

const nftRoutes = require("./src/nft/nft.route");

app.use("/api/special-edition", specialEditionRoutes);
app.use("/api/nft", nftRoutes);

const nftOrderRoutes = require("./src/nftOrder/nftOrder.route");
app.use("/api/nft-order", nftOrderRoutes);


// Root route
app.get("/", (req, res) => {
    res.send("Book Store Server is running!");
});

// Enable pre-flight requests for all routes
app.options('*', cors());

// MongoDB Connection & Server Start
async function startServer() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully!");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process if DB connection fails
    }
}

startServer();
