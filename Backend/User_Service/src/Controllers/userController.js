const User = require('../Models/user.js');
const {publishToQueue} = require('../Config/publisher.js');

const getAllProfiles = async(req, res) => {
    try {
        const users = await User.find({});
        if(users.length === 0) {
            return res.status(404).json({message: "No users found"});
        }
        res.json(users);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({message: "Server error"});
    }
}

const getProfile = async(req, res) => {
    const uid = req.params.uid;
    if(!uid) {
        return res.status(400).json({message: "User ID is required"});
    }
    try {
        const user = await User.findById(uid);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({message: "Server error"});
    }
}

const addProfile = async(req, res) => {;
    const {fullName, email, phone, location, skills, title, resume, profilePicture, bio, socialLinks} = req.body;
    if (!fullName || !email || !phone) {
        return res.status(400).json({message: "Required fields missing"});
    }
    try {
        const user = new User({
            fullName,
            email,
            phone,
            location,
            skills,
            title,
            resume,
            profilePicture,
            bio,
            socialLinks
        })
        await user.save();
        const data = {id: user._id, fullName};
        publishToQueue(process.env.USER_QUEUE, data); // Publish to RabbitMQ queue
        res.status(201).json({message: "User profile created successfully"});
    }
    catch(e) {
        if (e.code === 11000) {
            return res.status(400).json({message: "User already exists"});
        }
        console.error(e);
        res.status(500).json({message: "Server error"});
    }
}

const updateProfile = async(req, res) => {
    const uid = req.params.uid;
    if(!uid) {
        return res.status(400).json({message: "User ID is required"});
    }
    try {
        const user = await User.findById(uid);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const allowedFields = ['fullName', 'email', 'phone', 'location', 'skills', 'title', 'resume', 'profilePicture', 'bio', 'socialLinks'];
        const updates = Object.keys(req.body).filter(key => allowedFields.includes(key));

        const updatedUser = await User.findByIdAndUpdate(uid, {$set: updates}, {new: true});
        res.json({message: "User profile updated successfully", user: updatedUser});
    }
    catch(e) {
        console.error(e);
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {
    getAllProfiles,
    getProfile,
    addProfile,
    updateProfile
}
