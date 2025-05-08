const express = require('express');
const {healthCheck} = require('../Controllers/healthcontroller.js');

const router = express.Router();

router.get('/health', healthCheck);

module.exports = router;


