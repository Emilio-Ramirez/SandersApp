
// src/routes/userAccessRoutes.js
const express = require('express');
const router = express.Router();

// Add routes that both admin and regular users can access
router.get('/profile', (req, res) => {
  // Implement logic to fetch user profile
  res.json({ message: 'User profile' });
});

// Add more routes as needed

module.exports = router;
