const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('../../config/firebaseAdmin');
const verifyToken = require('../middleware/verifyUserToken');
const { getMe } = require('./user.controller');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Admin Login
router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });

        if (!admin || admin.role !== 'admin') {
            return res.status(404).send({ message: "Admin not found!" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password!" });
        }

        const tokenPayload = {
            id: admin._id,
            username: admin.username,
            role: admin.role
        };
        
        if (admin.email) {
            tokenPayload.email = admin.email;
        }
        
        
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
        

        return res.status(200).json({
            message: "Authentication successful",
            token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Failed to login as admin", error);
        res.status(500).send({ message: "Failed to login as admin" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        // If role is user, check if email is also required and matches
        if (user.role === "user") {
            if (!email || user.email !== email) {
                return res.status(401).send({ message: "Invalid or missing email for user login!" });
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password!" });
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email // Always include email
          };
        
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
        

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Failed to login", error);
        res.status(500).send({ message: "Failed to login user" });
    }
});

//firebase login
router.post("/firebase-login", async (req, res) => {
    const { idToken } = req.body;
    
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      
      let user = await User.findOne({ email: decoded.email });
      if (!user) {
        user = await User.create({
          email: decoded.email,
          username: decoded.name || decoded.email.split("@")[0],
          password: "", // optional: generate random string or leave blank
          role: "user"
        });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Firebase login successful",
        token,
        user: {
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
  
    } catch (error) {
        console.error("Firebase login error:", error.code, error.message, error.stack);
        res.status(401).json({ message: "Invalid Firebase token", details: error.message, code: error.code });
      }
    });
  


  router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
  
    try {
      // Check if user/email already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(409).json({ message: 'Email or username already in use' });
      }
  
      // Create new user WITHOUT manual hashing
      const newUser = new User({
        email,
        username,
        password, // plain password, will be hashed by pre-save hook
        role: 'user' // default role
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  });
  

router.get('/me', verifyToken, getMe);


module.exports = router;
