const express = require('express');
const {getProfile, updateProfile, addProfile, getAllProfiles} = require('../Controllers/userController.js');

const router = express.Router();

router.get('/', getAllProfiles);
router.get('/:uid', getProfile);
router.post('/', addProfile);
router.put('/:uid', updateProfile);

module.exports = router;


