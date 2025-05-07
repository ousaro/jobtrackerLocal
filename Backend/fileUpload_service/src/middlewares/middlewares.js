

// Middleware to set the folder key from request body or query
const setFolder = (req, res, next) => {
    req.folderKey = (req.query.folder || '').toUpperCase();
    req.owner = (req.query.owner || 'other');
    next();
}


module.exports = {setFolder};