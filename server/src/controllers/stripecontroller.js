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
    console.error('Error deleting Stripe customer:', error);
    throw new Error(`Failed to delete Stripe customer: ${error.message}`);
  }
};
