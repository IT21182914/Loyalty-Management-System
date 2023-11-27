// backend/src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Array to store refresh tokens
let refreshTokens = [];

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      password: hashedPassword,
      email,
    });

    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Log received credentials
    console.log('Received credentials:', { username, password });

    // Replace this with your actual user validation logic
    // For simplicity, this example assumes all users are valid
    const validUser = await User.findOne({ name: username });

    if (!validUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check the hashed password
    const passwordMatch = await bcrypt.compare(password, validUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = { name: username };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Generate Access Token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// ... (other controllers)

module.exports = {
  createUser,
  loginUser,
  // ... (other exports)
};
