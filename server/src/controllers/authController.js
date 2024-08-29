// controllers/authController.js
const { login } = require('../services/authService');
const { verifyToken } = require('../utils/jwt');

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
  console.log('Entering verifyTokenValidity function');
  try {
    console.log('Request headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);

    // Check if the Authorization header starts with 'Bearer '
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1]  // If it does, extract the token
      : authHeader;  // If not, assume the whole header is the token

    console.log('Extracted token:', token);

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('Attempting to verify token');
    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded);

    if (!decoded) {
      console.log('Token verification failed');
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log('Token successfully verified');
    res.status(200).json({ valid: true, userId: decoded.userId });
  } catch (error) {
    console.error('Error in verifyTokenValidity:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: `Internal server error: ${error.message}`,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
  console.log('Exiting verifyTokenValidity function');
};

module.exports = {
  loginController,
  verifyTokenValidity,
};
