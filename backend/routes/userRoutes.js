const express = require('express');
const {
  getUsers,
  getUser,
  getProfile,
  updateProfile,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Admin routes
router.route('/')
  .get(authorize('admin'), getUsers);

router.route('/:id')
  .get(authorize('admin'), getUser)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;
