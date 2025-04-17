const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true},
  location: String,
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
