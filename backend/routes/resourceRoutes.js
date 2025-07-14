const express = require('express');
const {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getResources)
  .post(authorize('moderator', 'admin'), createResource);

router
  .route('/:id')
  .get(getResource)
  .put(authorize('moderator', 'admin'), updateResource)
  .delete(authorize('admin'), deleteResource);

module.exports = router;