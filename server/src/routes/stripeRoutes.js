// src/routes/stripeRoutes.js
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

// Route for creating a one-time donation (no auth required)
router.post('/process-donation', async (req, res) => {
  try {
    const { amount, currency = 'usd', paymentMethod } = req.body;
    const result = await stripeController.processOneTimeDonation(amount, currency, paymentMethod);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
