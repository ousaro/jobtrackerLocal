const express = require('express');
const {getProfile, updateProfile, addProfile, getAllProfiles, getProfileWithEmail, getProfilesByIds} = require('../Controllers/userController.js');

const router = express.Router();

router.get('/', getAllProfiles);
router.post('/search', getProfilesByIds)
router.get('/:uid', getProfile);
router.get('/email/:email', getProfileWithEmail)
router.post('/', addProfile);
router.put('/:uid', updateProfile);

module.exports = router;


