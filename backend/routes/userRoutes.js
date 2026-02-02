const express = require('express');
const router = express.Router();
const { getMe, getUserById, searchUsers, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Search users (place this BEFORE the :userId route)
router.get('/search', auth, searchUsers);

// Get current user (place this BEFORE the :userId route)
router.get('/me', auth, getMe);

// Update current user profile
router.put('/me', auth, updateProfile);

// Get user by ID (place this AFTER /me route)
router.get('/:userId', auth, getUserById);

module.exports = router;