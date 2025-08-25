const express = require('express');
const router = express.Router();
const { sendTestEmail, sendReminderEmail, sendMissedHabitEmail } = require('../services/emailService');
const auth = require('../middleware/auth');

// Test email endpoint
router.post('/test', auth, async (req, res) => {
  try {
    const { email } = req.body;
    
    // Use provided email or fall back to user's email
    const testEmail = email || req.user.email;
    
    if (!testEmail) {
      return res.status(400).json({ 
        message: "No email address provided. Please provide an email or ensure your account has an email address." 
      });
    }
    
    console.log(`Sending test email to: ${testEmail}`);
    const result = await sendTestEmail(testEmail);
    
    if (result.success) {
      res.json({
        success: true,
        message: `Test email sent successfully to ${testEmail}`,
        messageId: result.messageId,
        response: result.response
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send test email",
        error: result.error
      });
    }
    
  } catch (error) {
    console.error("Test email route error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending test email",
      error: error.message
    });
  }
});

// Test reminder email endpoint
router.post('/test-reminder', auth, async (req, res) => {
  try {
    const { email, habitName, time, reminderMinutes } = req.body;
    
    const testEmail = email || req.user.email;
    const testHabitName = habitName || "Sample Habit";
    const testTime = time || "09:00";
    const testReminderMinutes = reminderMinutes || 15;
    
    if (!testEmail) {
      return res.status(400).json({ 
        message: "No email address provided." 
      });
    }
    
    console.log(`Sending test reminder email to: ${testEmail}`);
    const result = await sendReminderEmail(testEmail, testHabitName, testTime, testReminderMinutes);
    
    if (result) {
      res.json({
        success: true,
        message: `Test reminder email sent successfully to ${testEmail}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send test reminder email"
      });
    }
    
  } catch (error) {
    console.error("Test reminder email route error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending test reminder email",
      error: error.message
    });
  }
});

// Test missed habit email endpoint
router.post('/test-missed', auth, async (req, res) => {
  try {
    const { email, habitName } = req.body;
    
    const testEmail = email || req.user.email;
    const testHabitName = habitName || "Sample Habit";
    
    if (!testEmail) {
      return res.status(400).json({ 
        message: "No email address provided." 
      });
    }
    
    console.log(`Sending test missed habit email to: ${testEmail}`);
    const result = await sendMissedHabitEmail(testEmail, testHabitName);
    
    if (result) {
      res.json({
        success: true,
        message: `Test missed habit email sent successfully to ${testEmail}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send test missed habit email"
      });
    }
    
  } catch (error) {
    console.error("Test missed habit email route error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending test missed habit email",
      error: error.message
    });
  }
});

// Check email service status
router.get('/status', auth, async (req, res) => {
  try {
    const nodemailer = require('nodemailer');
    
    // Create a transporter to test connection
    const transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    
    // Test the connection
    const isConnected = await new Promise((resolve) => {
      transporter.verify((error, success) => {
        resolve(success && !error);
      });
    });
    
    res.json({
      connected: isConnected,
      configured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
      gmailUser: process.env.GMAIL_USER || 'Not configured',
      hasAppPassword: !!process.env.GMAIL_APP_PASSWORD
    });
    
  } catch (error) {
    res.status(500).json({
      connected: false,
      configured: false,
      error: error.message
    });
  }
});

module.exports = router;
