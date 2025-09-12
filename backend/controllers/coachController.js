const axios = require('axios');
const User = require('../models/user');
const Habit = require('../models/habitSchema');

/**
 * Test the GROQ API connection
 * @route GET /api/coach/test
 * @access Private
 */
exports.testGroqAPI = async (req, res) => {
  try {
    // Check if Groq API key exists
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ message: 'GROQ API key not configured' });
    }

    // Simple test request
    const testResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.1-8b-instant", // Updated to use current supported model
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Respond briefly."
          },
          {
            role: "user",
            content: "Say hello and confirm you're working."
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    res.json({
      success: true,
      message: 'GROQ API is working',
      response: testResponse.data.choices[0].message.content,
      model: testResponse.data.model
    });

  } catch (error) {
    console.error("GROQ API Test Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'GROQ API test failed',
      error: error.response?.data?.error || error.message,
      status: error.response?.status
    });
  }
};
exports.getCoachingAdvice = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message, coachType } = req.body;
    
    // Validate message
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    if (message.trim().length < 2) {
      return res.status(400).json({ message: 'Message must be at least 2 characters long' });
    }
    
    if (message.trim().length > 500) {
      return res.status(400).json({ message: 'Message must be less than 500 characters' });
    }

    // Get user's habits from database
    const habits = await Habit.find({ user: userId });
    
    // Get user data
    const user = await User.findById(userId);
    
    // Generate stats for context
    const stats = {
      totalHabits: habits.length,
      completedToday: habits.filter(h => {
        const today = new Date();
        return h.completedDates.some(date => {
          const d = new Date(date);
          return d.getDate() === today.getDate() &&
                 d.getMonth() === today.getMonth() &&
                 d.getFullYear() === today.getFullYear();
        });
      }).length,
      currentStreak: Math.max(...habits.map(h => h.currentStreak || 0), 0),
      longestStreak: Math.max(...habits.map(h => h.longestStreak || 0), 0)
    };
    
    // Define coach personalities and their prompts
    const coachPersonalities = {
      supportive: "You are a supportive and encouraging habit coach named Coach Alex. Use positive reinforcement, empathy, and gentle guidance. Focus on building confidence and celebrating small wins.",
      strict: "You are a strict, no-nonsense habit coach named Coach Drill. Be direct, firm but fair. Hold the user accountable and don't accept excuses. Focus on discipline and commitment.",
      funny: "You are a witty, humorous habit coach named Coach Chuckles. Use humor, puns and lighthearted jokes while providing solid habit advice. Keep things fun while being helpful.",
      analytical: "You are an analytical, data-driven habit coach named Coach Logic. Focus on metrics, patterns and evidence-based strategies. Be precise and methodical in your recommendations.",
      motivational: "You are an energetic, motivational habit coach named Coach Spark. Be inspiring and passionate, like a personal trainer or motivational speaker. Use powerful language to ignite action."
    };
    
    // Select coach personality or default to supportive
    const coachPrompt = coachPersonalities[coachType] || coachPersonalities.supportive;
    
    // Check if Groq API key exists
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ message: 'Server configuration error' });
    }
    
    // Call Groq API
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.1-8b-instant", // Updated to use current supported model
        messages: [
          {
            role: "system",
            content: `${coachPrompt} You're helping a user build and maintain good habits. Your responses should be concise (max 3-4 sentences per response) and actionable.`
          },
          {
            role: "user",
            content: `My name is ${user.username || 'User'}. 
            My current habit stats: 
            - Total habits: ${stats.totalHabits}
            - Completed today: ${stats.completedToday}
            - Current streak: ${stats.currentStreak}
            - Longest streak: ${stats.longestStreak}
            
            My habits are: ${habits.map(h => `${h.name} (${h.currentStreak} day streak)`).join(', ')}
            
            My question/message: ${message.trim()}`
          }
        ],
        temperature: 0.7,
        max_tokens: 250
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );
    
    if (!groqResponse.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from AI service');
    }
    
    const response = groqResponse.data.choices[0].message.content;
    
    res.json({
      message: response,
      coachType
    });
    
  } catch (error) {
    console.error("Coach API Error:", error);
    
    // Handle specific GROQ API errors
    if (error.response?.status === 400) {
      const errorDetail = error.response.data?.error?.message || 'Invalid request to AI service';
      console.error("GROQ API 400 Error:", error.response.data);
      return res.status(400).json({ 
        message: 'Your message could not be processed. Please try rephrasing your question.',
        detail: errorDetail 
      });
    }
    
    if (error.response?.status === 401) {
      console.error("GROQ API Authentication Error");
      return res.status(500).json({ message: 'AI service authentication error' });
    }
    
    if (error.response?.status === 429) {
      console.error("GROQ API Rate Limit Error");
      return res.status(429).json({ message: 'AI service is busy. Please try again in a moment.' });
    }
    
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      console.error("GROQ API Timeout Error");
      return res.status(503).json({ message: 'AI service is taking too long to respond. Please try again.' });
    }
    
    // Generic error
    res.status(500).json({ 
      message: 'Failed to get coaching advice. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};