const express = require('express');
const startConsumer = require('./src/Config/consumer');
const authMiddleware = require('./src/Middlewares/authMiddleware');
require('dotenv').config();

// Load environment variables from .env file
const PORT = process.env.PORT || 5000;


// routers
const searchRoutes = require('./src/routers/searchRoutes');


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/search",authMiddleware, searchRoutes);


app.listen(PORT, async () => {
  console.log(`SearchService running on http://localhost:${PORT}`);
  await startConsumer(); // Start RabbitMQ listener
});
