const nodemailer = require("nodemailer");
require('dotenv').config();

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.error("Missing required email configuration!");
  console.log("GMAIL_USER:", !!process.env.GMAIL_USER);
  console.log("GMAIL_APP_PASSWORD:", !!process.env.GMAIL_APP_PASSWORD);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000, // 10 seconds timeout
  greetingTimeout: 5000,    // 5 seconds timeout
  socketTimeout: 10000,     // 10 seconds timeout
});

// Test the connection immediately on startup with better error handling
transporter.verify(function (error, success) {
  if (error) {
    console.error("Email service connection failed:", error.message);
    console.warn("Email features will be limited until connection is restored");
  } else {
    console.log("✅ Email service connected successfully");
  }
});

const sendReminderEmail = async (to, habitName, time, reminderMinutes = 15) => {
  try {
    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `⏰ Reminder: ${habitName} in ${reminderMinutes} minutes`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #A2BFFE 0%, #7B9FFF 100%); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <a href="${process.env.FRONTEND_URL}"><h2 style="color: white; margin: 0;">⏰ Habit Reminder</h2></a>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Time for your habit in ${reminderMinutes} minutes!</h3>
            <p style="font-size: 16px; margin: 10px 0;">Hey there! This is a friendly reminder that it's almost time for:</p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #A2BFFE;">
              <h3 style="color: #A2BFFE; margin: 0 0 5px 0;">${habitName}</h3>
              <p style="color: #666; margin: 0;">Scheduled for: ${time}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; color: #333;">🌱 <strong>You've got this!</strong> 🌱</p>
            <p style="color: #666;">Consistency is the key to building lasting habits.</p>
          </div>
          
          <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666; text-align: center;">
              Don't forget to mark your habit as complete in the Habitz app! �
            </p>
          </div>
        </div>
      `,
    });
    
    console.log(`✅ Reminder email sent to ${to} for habit: ${habitName}`);
    return true;
  } catch (error) {
    console.error("Reminder email sending failed:", error.message);
    return false;
  }
};

const sendMissedHabitEmail = async (to, habitName) => {
  try {
    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `🤔 Did you complete your habit: ${habitName}?`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FFA07A 0%, #FF7F50 100%); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
             <a href="${process.env.FRONTEND_URL}"><h2 style="color: white; margin: 0;">🤔 Quick Check-in</h2></a>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0;">We noticed you haven't marked your habit as complete</h3>
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3 style="color: #FF7F50; margin: 0 0 5px 0;">${habitName}</h3>
              <p style="color: #666; margin: 0;">It's been 15 minutes since your scheduled time</p>
            </div>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="color: #333; margin-top: 0;">Did you complete it?</h4>
            <p style="margin: 10px 0;">If you completed your habit, don't forget to mark it in the app!</p>
            <p style="margin: 10px 0;">If you missed it today, that's okay too. Tomorrow is a fresh start! 🌅</p>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 16px; color: #333;">💪 <strong>Remember: Progress, not perfection!</strong> 💪</p>
            <p style="color: #666;">Consistency is key to building lasting habits. One missed day doesn't break your journey.</p>
          </div>
          
          <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666; text-align: center;">
              Open the Habitz app to track your progress and see your habit forest grow! �
            </p>
          </div>
        </div>
      `,
    });
    
    console.log(`📧 Missed habit email sent to ${to} for habit: ${habitName}`);
    return true;
  } catch (error) {
    console.error("Missed habit email sending failed:", error.message);
    return false;
  }
};

const sendTestEmail = async (to) => {
  try {
    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: "Test Email from Habitz App",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A2BFFE;">✅ Email Service Test</h2>
          <p>Congratulations! Your email service is working perfectly.</p>
          <p>This test email confirms that:</p>
          <ul>
            <li>✅ SMTP connection is established</li>
            <li>✅ Authentication is successful</li>
            <li>✅ Email delivery is functional</li>
          </ul>
          <p style="margin-top: 20px;">You can now receive habit reminders and notifications from Habitz!</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This is an automated test email from Habitz App.
          </p>
        </div>
      `,
    });
    
    return {
      success: true,
      messageId: result.messageId,
      response: result.response
    };
  } catch (error) {
    console.error("Test email sending failed:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendReminderEmail,
  sendMissedHabitEmail,
  sendTestEmail,
};
