// src/controllers/stripeController.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createStripeCustomer = async (userData) => {
  const { email, username, id } = userData;
  if (!email || !username) {
    throw new Error('Email and username are required to create a Stripe customer');
  }
  const customer = await stripe.customers.create({
    email: email,
    name: username,
    metadata: {
      userId: id.toString()
    }
  });
  return customer;
};

exports.deleteStripeCustomer = async (stripeCustomerId) => {
  try {
    await stripe.customers.del(stripeCustomerId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting Stripe customer:', error);
    throw new Error(`Failed to delete Stripe customer: ${error.message}`);
  }
};

exports.processOneTimeDonation = async (amount, currency, paymentMethod) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: paymentMethod,
      confirmation_method: 'manual',
      confirm: true,
      payment_method_types: ['card'],
    });

    if (paymentIntent.status === 'requires_action') {
      return {
        requiresAction: true,
        clientSecret: paymentIntent.client_secret
      };
    }

    if (paymentIntent.status === 'succeeded') {
      return {
        success: true,
        paymentIntentId: paymentIntent.id
      };
    }

    return {
      success: false,
      error: 'Payment failed'
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing one-time donation:', error);
    throw new Error(`Failed to process one-time donation: ${error.message}`);
  }
};
