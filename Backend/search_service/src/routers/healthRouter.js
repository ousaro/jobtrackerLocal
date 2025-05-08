const express = require('express');

const router = express.Router();

const {healthCheck} = require('../Controllers/healthController');

router.get('/health', healthCheck);


module.exports = router;