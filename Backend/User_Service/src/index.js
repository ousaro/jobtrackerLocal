const express = require('express');
const db = require('mongoose');
const userRoutes = require('./Routes/users');
const User = require('./Models/user.js');

require('dotenv').config();

const MONGO_URI= "mongodb://oumeri:PantryScanner2024@localhost:27018/user-service?authSource=admin";
 
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

db.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(PORT, () => {
        console.log(`Database connected successfully`);
        console.log(`Server is running on port ${PORT}`);
      });
}).then(() => {
    const user = new User({
        fullName: "John Doe",
        email: "john@gmail?com"
    });

    user.save()
})
.catch((err) => 
    console.log(err)
);


