// server/src/controllers/userController.js
const { prisma } = require('../config/database');

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
