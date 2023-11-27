// backend/src/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String, // Store hashed password
  email: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
