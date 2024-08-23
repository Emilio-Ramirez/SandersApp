require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('./src/middleware/authMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Apply authentication middleware to all routes except login and user creation
app.use(authMiddleware(['/api/auth/login', '/api/users/create']));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

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
const PORT = 4000;

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
