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

exports.processUserDonation = async (userId, amount, currency, projectId, isMensual, paymentMethodId, return_url) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true, email: true }
    });

    if (!user || !user.stripeCustomerId) {
      throw new Error('User not found or does not have a Stripe customer ID');
    }

    const project = await prisma.proyecto.findUnique({
      where: { id: projectId },
      select: { id: true, stripeIdProducto: true }
    });

    console.log('Project found:', project);

    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }

    if (!project.stripeIdProducto) {
      throw new Error(`Project with ID ${projectId} does not have a Stripe Product ID`);
    }

    if (isMensual) {
      // Handle subscription
      const price = await stripe.prices.create({
        product: project.stripeIdProducto,
        unit_amount: amount,
        currency: currency,
        recurring: { interval: 'month' },
      });

      const subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{ price: price.id }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription'
        },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          projectId: projectId.toString(),
        },
      });

      // Attach the payment method to the customer if it's not already
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: user.stripeCustomerId,
      });

      // Set the newly attached payment method as the default for the customer
      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      // Save subscription details to your database
      await prisma.suscripcion.create({
        data: {
          usuario: { connect: { id: userId } },
          stripe_subscription_id: subscription.id,
          estado: subscription.status,
          fecha_inicio: new Date(subscription.current_period_start * 1000),
          fecha_fin: new Date(subscription.current_period_end * 1000),
          proyecto: { connect: { id: projectId } },
          cantidad: amount / 100 // Convert cents to dollars/pesos
        }
      });

      return {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        status: subscription.status
      };
    } else {
      // Handle one-time donation
      // Create a Price object for this specific donation amount
      const price = await stripe.prices.create({
        unit_amount: amount,
        currency: currency,
        product: project.stripeIdProducto,
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: user.stripeCustomerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        return_url: return_url,
        metadata: {
          projectId: projectId.toString(),
          priceId: price.id,
        },
      });

      // Save donation details to your database
      await prisma.donacion.create({
        data: {
          usuario: { connect: { id: userId } },
          proyecto: { connect: { id: projectId } },
          cantidad: amount / 100, // Convert cents to dollars/pesos
          fecha: new Date(),
          stripe_id: paymentIntent.id,
          es_mensual: false
        }
      });

      return {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        status: paymentIntent.status
      };
    }
  } catch (error) {
    console.error('Error processing user donation:', error);
    throw new Error(`Failed to process user donation: ${error.message}`);
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

exports.deletePaymentMethod = async (userId, paymentMethodId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.stripeCustomerId) {
      throw new Error('User not found or does not have a Stripe customer ID');
    }

    // Detach the payment method from the customer
    await stripe.paymentMethods.detach(paymentMethodId);

    return { message: 'Payment method deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete payment method: ${error.message}`);
  }
};


exports.createSubscription = async (userId, amount, currency, paymentMethodId, projectId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true }
    });

    if (!user || !user.stripeCustomerId) {
      throw new Error('User not found or does not have a Stripe customer ID');
    }

    const project = await prisma.proyecto.findUnique({
      where: { id: projectId },
      select: { stripeIdProducto: true }
    });

    if (!project || !project.stripeIdProducto) {
      throw new Error('Project not found or does not have a Stripe Product ID');
    }

    // Create a new price for this specific subscription
    const price = await stripe.prices.create({
      product: project.stripeIdProducto,
      unit_amount: amount,
      currency: currency,
      recurring: { interval: 'month' },
    });

    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: price.id }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription'
      },
      expand: ['latest_invoice.payment_intent'],
    });

    // Attach the payment method to the customer if it's not already
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Set the newly attached payment method as the default for the customer
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    return subscription;
  } catch (error) {
    throw new Error(`Failed to create subscription: ${error.message}`);
  }
};

exports.createPaymentIntent = async (amount, currency, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`Failed to create PaymentIntent: ${error.message}`);
  }
};

exports.updateSubscription = async (userId, subscriptionId, newAmount) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true }
    });

    if (!user || !user.stripeCustomerId) {
      throw new Error('User not found or does not have a Stripe customer ID');
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const currentPriceId = subscription.items.data[0].price.id;

    // Create a new price with the new amount
    const newPrice = await stripe.prices.create({
      product: subscription.items.data[0].price.product,
      unit_amount: newAmount,
      currency: subscription.items.data[0].price.currency,
      recurring: { interval: 'month' },
    });

    // Update the subscription with the new price
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPrice.id,
        },
      ],
    });

    // Delete the old price
    await stripe.prices.update(currentPriceId, { active: false });

    return updatedSubscription;
  } catch (error) {
    throw new Error(`Failed to update subscription: ${error.message}`);
  }
};
