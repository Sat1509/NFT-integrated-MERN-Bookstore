require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/users/user.model"); // Adjust path if needed

async function createAdmin() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const existingAdmin = await User.findOne({ username: "admin" });
        if (existingAdmin) {
            console.log("Admin already exists!");
            return process.exit();
        }

        //await bcrypt.hash("admin123", 10);
        
        const admin = new User({
            username: ".....", //enter a username for admin profile
            password: ".....", //enter a password for admin profile
            role: "admin"
        });

        await admin.save();
        console.log("Admin user created successfully!");
        process.exit();
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
}

createAdmin();
