const express = require('express');
const {checkHealth} = require('../Controllers/healthController');

const router = express.Router();

// Route to check health
router.get('/', checkHealth);


module.exports = router;