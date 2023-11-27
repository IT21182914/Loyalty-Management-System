const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Define a route to get all users with role 'user'
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
