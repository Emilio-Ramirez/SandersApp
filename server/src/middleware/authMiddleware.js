// middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwt');

function authMiddleware(excludedPaths = []) {
  return (req, res, next) => {
    if (excludedPaths.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = authMiddleware;
