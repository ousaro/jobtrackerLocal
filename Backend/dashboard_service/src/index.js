const express = require('express');
const registerService = require('./Config/registerService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5006;

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.listen(PORT, () => {
    console.log(`Dashbooard service is running on port ${PORT}`);
    registerService()
});