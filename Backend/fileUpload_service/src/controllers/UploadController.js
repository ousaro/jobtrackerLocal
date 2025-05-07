const path = require('path');
const fs = require('fs');
const UploadFolders = require('../constants/UploadFolders');

exports.handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  // Folder information:
  const folderKey = req.folderKey;
  const folder = UploadFolders[folderKey] || 'other';

  return res.json({ 
    message: "File uploaded successfully!",
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${folder}/${req.owner}/${req.file.filename}`
    }
  });
};

exports.getFile = (req, res) => {
  const folder = req.params.folder;
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../../uploads', folder, filename);

  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filepath);
  });
};

