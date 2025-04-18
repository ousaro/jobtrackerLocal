const express = require('express');

const router = express.Router();

const { searchByType, reindexAll } = require('../Controllers/searchController');


router.get('/:type', searchByType);
router.post('/reindex-all', reindexAll);

module.exports = router;