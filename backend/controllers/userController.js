const User = require("../models/user");
const Habit = require("../models/habitSchema");

// Search users by username
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.json([]);
    }
    
    // Search for users whose username contains the query (case-insensitive)
    const users = await User.find({
      username: { $regex: query, $options: 'i' }
    })
    .select('username email avatar')
    .limit(10);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID (for viewing profiles)
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // If no userId provided, return current user's info
    const targetUserId = userId || req.user.id;
    
    const user = await User.findById(targetUserId).select("username email avatar createdAt");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Get user's habits statistics
    const habits = await Habit.find({ user: targetUserId });
    const totalHabits = habits.length;
    const longestStreak = Math.max(...habits.map(h => h.currentStreak || 0), 0);
    const completedHabits = habits.filter(h => (h.completedDates?.length || 0) > 0).length;
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      stats: {
        totalHabits,
        longestStreak,
        completedHabits
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      googleCalendar: user.googleCalendar, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, avatar } = req.body;
    const userId = req.user.id;
    
    // Check if username is already taken by another user
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }
    
    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return res.status(400).json({ message: "Email already taken" });
      }
    }
    
    // Update user
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatar !== undefined) updateData.avatar = avatar;
    
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      message: "Profile updated successfully"
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};