const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    console.log("🔄 Registration attempt:", req.body);
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ 
        message: "Please provide username, email, and password" 
      });
    }

    console.log("📧 Checking if user exists...");
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("👤 Creating new user...");
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    console.log("✅ User created successfully:", user._id);
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        googleCalendar: user.googleCalendar, // Include Google Calendar connection status
        token: generateToken(user._id),
      });
    } else {
      console.log("❌ User creation failed - no user returned");
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("❌ Registration error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => 
        error.errors[key].message
      );
      return res.status(400).json({
        message: "Validation error",
        errors: validationErrors
      });
    } else if (error.code === 11000) {
      return res.status(400).json({
        message: "User with this email or username already exists"
      });
    }
    
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      googleCalendar: user.googleCalendar, // Include Google Calendar connection status
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      googleCalendar: user.googleCalendar, // <-- Add this line
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Add this new function
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
