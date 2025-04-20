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

const getProfilesByIds =  async (req, res) => {
    try {
      const { ids } = req.body;
  
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'IDs must be a non-empty array' });
      }
  
      const profiles = await User.find({ _id: { $in: ids } });
  
      res.status(200).json(profiles);
    } catch (err) {
      console.error('Error fetching profiles by IDs:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

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

const getProfileWithEmail = async(req, res) => {
    const { email } = req.params;
    if(!email) {
        return res.status(400).json({message: "Email is required"});
    }
    try {
        const user = await User.findOne({ email });
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
    const {fullName, email, phone} = req.body;
    if (!fullName || !email || !phone) {
        return res.status(400).json({message: "Required fields missing"});
    }
    try {
        const user = new User({
            fullName,
            email,
            phone
        })
        await user.save();
        const data = {id: user._id, fullName};
        publishToQueue(process.env.USER_QUEUE, data); // Publish to RabbitMQ queue
        res.status(201).json({message: "User profile created successfully", data});
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

        const allowedFields = ['fullName', 'email', 'phone', 'location', 'skills', 'title', 'resume', 'avatar', 'bio', 'socialLinks'];
        // Create update object
        const updates = {};
        allowedFields.forEach(field => {
            if (field in req.body) {
                updates[field] = req.body[field];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(uid, {$set: updates}, {new: true});
        const data = {id: updatedUser._id, fullName: updatedUser.fullName};
        publishToQueue(process.env.USER_QUEUE, data);
        res.json(updatedUser);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {
    getAllProfiles,
    getProfilesByIds,
    getProfile,
    getProfileWithEmail,
    addProfile,
    updateProfile
}
