const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    // Add validation
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        error: "Request body is missing or empty" 
      });
    }

    const { email, password, username, createdAt } = req.body;
    
    // Check required fields
    if (!email || !password || !username) {
      return res.status(400).json({ 
        error: "Email, password, and username are required" 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    res.status(201).json({ 
      message: "User signed up successfully", 
      success: true, 
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
    
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};