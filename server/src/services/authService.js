// services/authService.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const prisma = new PrismaClient();

const login = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true
      }
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    const token = generateToken({ userId: user.id, role: user.role });
    return {
      userId: user.id,
      token: token,
      role: user.role
    };
  } catch (error) {
    // Wrap the original error in a new error with a more generic message
    throw new Error('Authentication failed: ' + error.message);
  }
};

module.exports = {
  login,
};
