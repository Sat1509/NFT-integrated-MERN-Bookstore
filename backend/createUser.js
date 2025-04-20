require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/users/user.model"); // Adjust the path if needed

async function createAccount() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // === CONFIG SECTION ===
        const role = "user"; // Change to "admin" or "user"
        const username = "userSat"; // Desired username
        const email = "Sathammai2010@gmail.com"; // Only needed if role === 'user'
        const plainPassword = "Sathammai123"; // Password

        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log(`${role} with that username already exists!`);
            return process.exit();
        }

        // Prepare user data
        const userData = {
            username,
            password: plainPassword,
            role,
        };

        if (role === "user") {
            userData.email = email;
        }

        // Save new user
        const newUser = new User(userData);
        await newUser.save();

        console.log(`${role} account created successfully!`);
        process.exit();
    } catch (error) {
        console.error("Error creating account:", error);
        process.exit(1);
    }
}

createAccount();
