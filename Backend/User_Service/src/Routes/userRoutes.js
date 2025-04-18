const express = require('express');
const User = require('../Models/user.js');
const {getProfile, updateProfile, addProfile} = require('../Controllers/userController.js');

const router = express.Router();

router.get('/profile/:uid', getProfile);
router.post('/profile', addProfile);
router.put('/profile/:uid', updateProfile);

module.exports = router;


