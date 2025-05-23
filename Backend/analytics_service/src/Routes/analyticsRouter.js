const express = require('express');
const {getAnalyticsDataSummary} = require('../Controllers/analyticsController');


const router = express.Router();

// Route to get analytics summary
router.get('/summary', getAnalyticsDataSummary);

module.exports = router;