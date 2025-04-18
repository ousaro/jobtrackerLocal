const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  location: {
    city: String,
    state: String,
    country: String
  },
  skills: [String],
  title: String,
  resume: String,
  profilePicture: String,
  bio: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
