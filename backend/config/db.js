const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Enhanced connection options for Atlas (removed deprecated options)
    const connectionOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    console.log("Connecting to MongoDB...");
    console.log("Database URI:", process.env.MONGO_URI ? "Set" : "Missing");
    
    // Check if using Atlas or local
    const isAtlas = process.env.MONGO_URI && process.env.MONGO_URI.includes('mongodb+srv');
    console.log("Database type:", isAtlas ? "MongoDB Atlas (Cloud)" : "Local MongoDB");

    await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    
    console.log("✅ MongoDB connected successfully!");
    if (isAtlas) {
      console.log("🌍 Using MongoDB Atlas (Cloud Database)");
    } else {
      console.log("💻 Using Local MongoDB");
    }
    
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    
    // Provide helpful error messages
    if (error.message.includes('authentication failed')) {
      console.error("🔐 Authentication failed - Check your username/password in MONGO_URI");
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error("🌐 Network error - Check your internet connection or Atlas cluster status");
    } else if (error.message.includes('IP not in whitelist')) {
      console.error("🚫 IP not whitelisted - Add your IP to Atlas Network Access");
    } else if (error.message.includes('MongooseServerSelectionError')) {
      console.error("⚠️ Server selection timeout - Check your connection string and Atlas cluster status");
    }
    
    console.error("💡 Troubleshooting tips:");
    console.error("   1. Verify your Atlas connection string includes the database name");
    console.error("   2. Check your Atlas cluster is running");
    console.error("   3. Verify your IP is whitelisted in Atlas Network Access");
    
    process.exit(1); // Exit process with failure
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

module.exports = connectDB;
