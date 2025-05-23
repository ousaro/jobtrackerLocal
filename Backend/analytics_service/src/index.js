const express = require('express');
const db = require('mongoose')
const registerService = require('./Config/registerService');
const start = require('./Config/consumer');
require('dotenv').config();

const analyticsRouter = require('./Routes/analyticsRouter');
const healthRouter = require('./Routes/healthRouter');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobtracker';
const app = express();
const PORT = process.env.PORT || 5005;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/analytics',analyticsRouter);
app.use('/health', healthRouter);


db.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Analytics service is running on port ${PORT}`);
            registerService();

            start().catch(err => {
                console.error('❌ Error in analytics consumer:', err);
                process.exit(1);
            });

        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
});
