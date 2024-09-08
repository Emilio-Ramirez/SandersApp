// controllers/authController.js
const { login } = require('../services/authService');
const { verifyToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { userId, token, role } = await login(email, password);
    res.json({ userId, token, role }); // Include role in the response
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occurred during login' });
    }
  }
};

const verifyTokenValidity = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = verifyToken(token);
      res.status(200).json({
        valid: true,
        userId: decoded.userId, // Change from 'id' to 'userId' to match the payload
        role: decoded.role
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token has expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        throw error;
      }
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal server error: ${error.message}`,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  loginController,
  verifyTokenValidity,
};
