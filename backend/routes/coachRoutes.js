const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');
const auth = require('../middleware/auth');

// Protect all routes
router.use(auth);

// @route   POST api/coach
// @desc    Get habit coaching advice
// @access  Private
router.post('/', coachController.getCoachingAdvice);

// @route   GET api/coach/test
// @desc    Test GROQ API connection
// @access  Private
router.get('/test', coachController.testGroqAPI);

module.exports = router;