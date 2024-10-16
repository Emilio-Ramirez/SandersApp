const { prisma } = require('../config/database');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.suscripcion.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        proyecto: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching all subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.userId;

    const subscriptions = await prisma.suscripcion.findMany({
      where: {
        usuarioId: userId,
      },
      include: {
        proyecto: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    // Fetch up-to-date information from Stripe
    const updatedSubscriptions = await Promise.all(subscriptions.map(async (sub) => {
      const stripeSubscription = await stripe.subscriptions.retrieve(sub.stripe_subscription_id);
      return {
        ...sub,
        status: stripeSubscription.status,
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        amount: stripeSubscription.items.data[0].price.unit_amount / 100,
      };
    }));

    // Filter out subscriptions that are not active
    const activeSubscriptions = updatedSubscriptions.filter(sub => 
      sub.status === 'active' || sub.status === 'trialing'
    );

    res.json(activeSubscriptions);
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
