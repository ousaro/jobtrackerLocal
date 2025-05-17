const express = require('express');

const router = express.Router();

const { searchByType, searchByTypeWithId, reindexAll, deleteDocument } = require('../Controllers/searchController');


router.get('/:type', searchByType);
router.get('/:type/:id', searchByTypeWithId);
router.get('/reindex-all', reindexAll);
router.delete('/:type/:id', deleteDocument);

module.exports = router;