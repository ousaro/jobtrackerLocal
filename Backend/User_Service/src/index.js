const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require("./Middlewares/authMiddleware");
require("dotenv").config();

// Load environment variables from .env file
const PORT = process.env.PORT || 5001;

// Routers
const userRoutes = require("./Routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users/profile",authMiddleware, userRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
}).catch((e) => {
    console.error("MongoDB connection error:", e.message);
})


