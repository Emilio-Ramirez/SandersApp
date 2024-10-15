const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/suscripcionController')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Route to get all subscriptions (admin only)
router.get('/all', authMiddleware, roleMiddleware(['admin']), subscriptionController.getAllSubscriptions);

// Route to get subscriptions for the authenticated user
router.get('/user', authMiddleware, subscriptionController.getUserSubscriptions);

module.exports = router;
