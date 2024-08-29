// services/authService.js
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async (email, password) => {

  const user = await prisma.user.findUnique({ where: { email } });
  

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }


  const token = generateToken(user.id);  // Changed from user.idUser to user.id

  return { user, token };
};

module.exports = {
  login,
};
