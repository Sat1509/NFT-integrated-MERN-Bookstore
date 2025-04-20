const jwt = require("jsonwebtoken");
const admin = require("../../config/firebaseAdmin");

const verifyUserToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const source = req.headers["x-auth-source"];

    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    if (!source || !["firebase", "custom"].includes(source)) {
        return res.status(401).json({ error: "Invalid authentication source" });
    }

    const token = authHeader.split(" ")[1];

    try {
        if (source === "firebase") {
            const decodedToken = await admin.auth().verifyIdToken(token);
            
            req.user = {
                id: decodedToken.uid,
                email: decodedToken.email || null,
                name: decodedToken.name || "Anonymous",
                role: "user",
                authSource: "firebase"
            };
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
           
            req.user = {
                id: decoded.id,
                email: decoded.email || null,
                name: decoded.name || decoded.username || "Anonymous",
                role: decoded.role || "user",
                authSource: "custom"
            };
        }

        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({
            error: "Invalid or expired token",
            details: source === "firebase" ? "Firebase token failed" : "Custom token failed"
        });
    }
};

module.exports = verifyUserToken;
