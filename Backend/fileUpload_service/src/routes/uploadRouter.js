const express = require('express');
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const fs = require('fs');
const {setFolder} = require('../middlewares/middlewares');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const UploadFolders = require('../constants/UploadFolders');
        const folder = UploadFolders[req.folderKey] || 'other';
        const uploadPath = `uploads/${folder}/${req.owner}`;
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }

});


const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});


// Routes
router.post('/upload',setFolder,upload.single('file'), uploadController.handleFileUpload); // upload.single('file') is the name of the file input in the form / form-data postman

// Route to get an uploaded file by file name
router.get('/uploads/:folder/:filename', uploadController.getFile);


module.exports = router;
