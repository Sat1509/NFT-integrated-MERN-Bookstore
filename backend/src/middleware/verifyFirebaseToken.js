const admin = require("../config/firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // expects: Bearer <token>

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // attaches user data (email, uid, etc.) to req.user
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = verifyFirebaseToken;
