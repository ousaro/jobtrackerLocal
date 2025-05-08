const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const uploadRoutes = require('./src/routes/uploadRouter');
const healthRouter = require('./src/routes/healthRouter');
const registerService = require('./src/config/registerService');
const PORT = process.env.PORT || 5007;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Serve uploads directory publicly
app.use('/uploads', express.static(uploadsDir));

// Use upload routes
app.use('/', uploadRoutes);
app.use('/', healthRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  registerService()
});
