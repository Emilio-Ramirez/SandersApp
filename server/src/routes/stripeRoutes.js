// src/routes/stripeRoutes.js
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes that don't require authentication
router.post('/process-donation', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    const result = await stripeController.processOneTimeDonation(amount, currency);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/record-successful-donation', async (req, res) => {
  try {
    const { paymentIntentId, email } = req.body;
    const donation = await stripeController.recordSuccessfulDonation(paymentIntentId, email);
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes that require authentication
router.use(authMiddleware);

router.post('/add-payment-method', async (req, res) => {
  try {
    const { paymentMethodId } = req.body;
    const userId = req.userId;
    const paymentMethod = await stripeController.addPaymentMethod(userId, paymentMethodId);
    res.json(paymentMethod);
  } catch (error) {
    console.error('Detailed server error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/payment-methods', async (req, res) => {
  try {
    const userId = req.userId; // Using userId from authMiddleware
    const paymentMethods = await stripeController.getUserPaymentMethods(userId);
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/payment-methods/:paymentMethodId', async (req, res) => {
  try {
    const userId = req.userId;
    const { paymentMethodId } = req.params;
    await stripeController.deletePaymentMethod(userId, paymentMethodId);
    res.json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
