// In userRoutes.js

const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole
} = require('../controllers/userController');

// Existing routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// New route for changing user role (accessible to all authenticated users for now)
router.patch('/:id/role', changeUserRole);

module.exports = router;
