const express = require('express');
const cors = require('cors')
const startConsumer = require('./Config/consumer');
const authMiddleware = require('./Middlewares/authMiddleware');
const registerService = require('./Config/registerService');
require('dotenv').config();

// Load environment variables from .env file
const PORT = process.env.PORT || 5009;


// routers
const searchRoutes = require('./routers/searchRoutes');
const healthRouter = require('./routers/healthRouter');


const app = express();

// Middlewares
// Allow requests from frontend
app.use(cors({
  origin: 'http://localhost:3000', // or '*' for all origins (not recommended for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies/auth headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/search", searchRoutes);
app.use("/", healthRouter);

app.listen(PORT, async () => {
  console.log(`SearchService running on http://localhost:${PORT}`);
  await startConsumer(); // Start RabbitMQ listener
  registerService();
});
