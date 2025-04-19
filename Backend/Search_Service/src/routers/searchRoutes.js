const express = require('express');

const router = express.Router();

const { searchByType, reindexAll, deleteDocument } = require('../Controllers/searchController');


router.get('/:type', searchByType);
router.get('/reindex-all', reindexAll);
router.delete('/:type/:id', deleteDocument);

module.exports = router;