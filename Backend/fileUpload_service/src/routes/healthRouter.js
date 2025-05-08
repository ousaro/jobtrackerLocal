const express = require('express');
const healthController = require('../controllers/HealthController');


const router = express.Router();

router.get('/health', healthController.healthCheck);


module.exports = router;
