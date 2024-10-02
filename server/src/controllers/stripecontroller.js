// src/controllers/stripeController.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { prisma } = require('../config/database');

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


exports.processOneTimeDonation = async (amount, currency) => {
  try {
    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: paymentIntent.client_secret
    };
  } catch (error) {
    throw new Error(`Failed to create PaymentIntent: ${error.message}`);
  }
};

exports.recordSuccessfulDonation = async (paymentIntentId, email) => {
  try {
    // Retrieve the PaymentIntent to get the final amount
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if a user with this email exists
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // Prepare the donation data
    const donationData = {
      cantidad: paymentIntent.amount / 100, // Convert cents to dollars/pesos
      fecha: new Date(),
      stripe_id: paymentIntentId,
      es_mensual: false,
      email: email,
    };

    // If user exists, connect the donation to the user
    if (user) {
      donationData.usuario = { connect: { id: user.id } };
    }
    // If user doesn't exist, we just leave the usuario field unset

    // Store the donation in the database
    const donation = await prisma.donacion.create({
      data: donationData,
    });

    return donation;
  } catch (error) {
    throw new Error(`Failed to record successful donation: ${error.message}`);
  }
};


exports.addPaymentMethod = async (userId, paymentMethodId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.stripeCustomerId) {
      throw new Error('User not found or does not have a Stripe customer ID');
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, { customer: user.stripeCustomerId });

    // Set it as the default payment method
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    return { message: 'Payment method added successfully' };
  } catch (error) {
    throw new Error(`Failed to add payment method: ${error.message}`);
  }
};

exports.getUserPaymentMethods = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.stripeCustomerId) {
      throw new Error('User not found or does not have a Stripe customer ID');
    }
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: 'card',
    });
    return paymentMethods.data;
  } catch (error) {
    throw new Error(`Failed to retrieve user payment methods: ${error.message}`);
  }
};
