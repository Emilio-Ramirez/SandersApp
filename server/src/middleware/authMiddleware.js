// src/middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const userId = req.headers['x-user-id'];

  if (!token || !userId) {
    return res.status(401).json({ message: 'No token or user ID provided' });
  }

  try {
    verifyToken(token);
    req.userId = parseInt(userId); // Attach userId to the request
    next();
  } catch (error) {
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token', 
        error: error.message 
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired', 
        error: error.message,
        expiredAt: error.expiredAt
      });
    } else {
      return res.status(500).json({ 
        message: 'Authentication error', 
        error: error.message 
      });
    }
  }
};

module.exports = authMiddleware;
