// backend/src/routes/authRoutes.js
const express = require('express');
const { createUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// User Registration Route
router.post('/register', createUser);

// User Login Route
router.post('/login', loginUser);

module.exports = router;
