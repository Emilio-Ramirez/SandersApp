// src/routes/stripeRoutes.js const express = require('express');
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes that don't require authentication
router.post('/process-donation', async (req, res) => {
  try {
    const { amount, currency = 'mxn' } = req.body;
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

// Process user donation (one-time or subscription)
router.post('/process-user-donation', async (req, res) => {
  try {
    const { amount, currency, projectId, isMensual, paymentMethodId, return_url } = req.body;
    const userId = req.userId;

    const missingParams = [];
    if (!userId) missingParams.push('userId');
    if (!amount) missingParams.push('amount');
    if (!currency) missingParams.push('currency');
    if (!projectId) missingParams.push('projectId');
    if (!paymentMethodId) missingParams.push('paymentMethodId');
    if (!return_url) missingParams.push('return_url');
    // We're not checking isMensual because it's a boolean and can be false

    if (missingParams.length > 0) {
      return res.status(400).json({ error: `Missing required parameters: ${missingParams.join(', ')}` });
    }

    const result = await stripeController.processUserDonation(
      userId,
      parseInt(amount), // Ensure amount is an integer (cents)
      currency,
      projectId,
      isMensual,
      paymentMethodId,
      return_url
    );
    res.json(result);
  } catch (error) {
    console.error('Error processing user donation:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update subscription
router.put('/subscriptions/:subscriptionId', async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { newAmount } = req.body;
    const userId = req.userId;
    const result = await stripeController.updateSubscription(userId, subscriptionId, newAmount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription
router.delete('/subscriptions/:subscriptionId', async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const userId = req.userId;
    const result = await stripeController.cancelSubscription(userId, subscriptionId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's active subscriptions
router.get('/subscriptions', async (req, res) => {
  try {
    const userId = req.userId;
    const subscriptions = await stripeController.getUserSubscriptions(userId);
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
