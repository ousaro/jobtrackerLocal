const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const registerService = require("./Config/registerService");

require("dotenv").config();

const PORT = process.env.PORT || 5002;

const applicationRoutes = require("./Routes/applicationRoutes");
const healthRouter = require("./Routes/healthRouter");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/applications", applicationRoutes);
app.use('/', healthRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, async () => {
        console.log(`Application service running on port ${PORT}`)
        registerService()
    })
}).catch((e) => {
    console.error("MongoDB connection error:", e.message);
})
