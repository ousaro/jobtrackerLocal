const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const uploadRoutes = require('./src/routes/uploadRouter');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Serve uploads directory publicly
app.use('/uploads', express.static(uploadsDir));

// Use upload routes
app.use('/', uploadRoutes);

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
