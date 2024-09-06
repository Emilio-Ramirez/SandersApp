// src/middleware/roleMiddleware.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const roleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.userId; // Get userId from req object

    if (!userId) {
      return res.status(401).json({ message: 'User ID not provided' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: { role: true }
      });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (allowedRoles.includes(user.role)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error verifying user role', error: error.message });
    }
  };
};

module.exports = roleMiddleware;
