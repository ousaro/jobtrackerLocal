const express = require('express');
const {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationsByIds,
} = require('../Controllers/applicationController.js');

const router = express.Router();

router.get('/', getAllApplications);
router.post('/ids', getApplicationsByIds);
router.get('/:id', getApplication);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
