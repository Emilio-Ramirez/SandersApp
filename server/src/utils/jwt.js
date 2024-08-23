// utils/jwt.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { id: user.idUser, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
