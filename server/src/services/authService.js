const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const { prisma } = require('../config/database');


async function login(username, password) {
  const user = await prisma.user.findUnique({
    where: { username: username }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user);
  return { user, token };
}

module.exports = { login };
