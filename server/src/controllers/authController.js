// controllers/authController.js
const { login } = require('../services/authService');
const { verifyToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


const verifyTokenValidity = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header starts with 'Bearer '
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]  // If it does, extract the token
      : authHeader;  // If not, assume the whole header is the token

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = verifyToken(token);
      res.status(200).json({ valid: true, userId: decoded.id });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token has expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        throw error; // Re-throw unexpected errors
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
