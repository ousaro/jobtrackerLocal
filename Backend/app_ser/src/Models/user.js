const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  location: String,
  skills: String,
  title: String,
  resume: String,
  avatar: String,
  bio: String,
  website: String,
  socialLinks: {
    github: String,
    linkedin: String
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
