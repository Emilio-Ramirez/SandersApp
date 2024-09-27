const verifyAdmin = (req, res, next) => {
    // Suponiendo que el usuario está almacenado en req.user
    if (req.user && req.user.role === 'admin') {
      next(); // Si es administrador, continúa
    } else {
      return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
  };
  
  module.exports = verifyAdmin;
  