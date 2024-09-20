/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('./src/middleware/authMiddleware');
const roleMiddleware = require('./src/middleware/roleMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes that don't require authentication
app.use('/api/auth', authRoutes);

// Routes that require authentication and admin role
app.use('/api/admin/users', authMiddleware, roleMiddleware(['admin']), userRoutes);

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

async function startServer() {
  const connected = await checkDatabaseConnection();
  if (connected) {
    app.listen(PORT, () => {
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
