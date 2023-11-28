const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String, // Store hashed password
  email: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Set the default role to 'user'
  },
  loyaltyPoints: {
    type: Number,
    default: 0, // Set the default loyalty points to 0
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
