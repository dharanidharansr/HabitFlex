const express = require('express');
const router = express.Router();
const { getMe, getUserById, searchUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Search users (place this BEFORE the :userId route)
router.get('/search', auth, searchUsers);

// Get current user (place this BEFORE the :userId route)
router.get('/me', auth, getMe);

// Get user by ID (place this AFTER /me route)
router.get('/:userId', auth, getUserById);

module.exports = router;