const express = require('express');
const registerService = require('./Config/registerService');
const start = require('./Config/consumer');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5005;

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.listen(PORT, () => {
    console.log(`Analytics service is running on port ${PORT}`);
    registerService();

    start().catch(err => {
        console.error('❌ Error in analytics consumer:', err);
        process.exit(1);
    });

});