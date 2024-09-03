// server/src/controllers/userController.js
const { prisma } = require('../config/database');
const bcrypt = require('bcrypt');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        donaciones: true,
        suscripciones: true,
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if user with the same username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      },
    });

    // Create a new object without the password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { username, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



/*model User {
  id           Int           @id @default(autoincrement())
  username     String        @unique
  email        String        @unique
  donaciones   Donacion[]
  suscripciones Suscripcion[]
  logs         Log[]
}
*/
