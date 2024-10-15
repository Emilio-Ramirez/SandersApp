/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('./src/middleware/authMiddleware');
const roleMiddleware = require('./src/middleware/roleMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const donacionRoutes = require('./src/routes/donacionRoutes');
const donacionFisicaRoutes = require('./src/routes/donacionFisicaRoutes');
const stripeRoutes = require('./src/routes/stripeRoutes');
const proyectoRoutes = require('./src/routes/proyectoRoutes');
const fs = require('fs');
const https = require('https');

const app = express();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const donacionFisicaRoutes = require('./src/routes/donacionFisicaRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes that don't require authentication
app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);

// Routes that require authentication and admin role
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/donaciones', authMiddleware, roleMiddleware(['admin']), donacionRoutes);
app.use('/api/proyectos', authMiddleware, roleMiddleware(['admin', 'user']), proyectoRoutes);

app.get('/api/verify-stripe', async (req, res) => {
  try {
    await stripe.customers.list({ limit: 1 });
    res.json({ success: true, message: 'Stripe connection verified successfully' });
  } catch (error) {
    console.error('Stripe connection verification failed:', error);
    res.status(500).json({ success: false, message: 'Stripe connection verification failed', error: error.message });
  }
});


// Routes for handling physical donations with authentication
app.use('/api/donaciones-fisicas', authMiddleware, donacionFisicaRoutes);

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully.');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Start the server
const PORT = process.env.PORT || 4000;

// Read Certificates
const privateKey = fs.readFileSync('./certs/server.key', 'utf8');
const certificate = fs.readFileSync('./certs/server.crt', 'utf8');
const ca = fs.readFileSync('./certs/ca.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };
const httpsServer = https.createServer(credentials, app);

async function startServer() {
  const connected = await checkDatabaseConnection();
  if (connected) {
    httpsServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error('Failed to start server due to database connection issues');
    process.exit(1);
  }
}

// If this file is run directly (not imported as a module), start the server
if (require.main === module) {
  startServer().catch((error) => {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = { app, prisma };

// Registrar las rutas
app.use('/api', userRoutes);
