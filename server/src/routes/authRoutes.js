// src/routes/authRoutes.js
const express = require('express');
const { loginController, verifyTokenValidity } = require('../controllers/authController');
const { createUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginController);
router.get('/verify-token', verifyTokenValidity);
router.post('/register', createUser); // Add this line

module.exports = router;
