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
    const { username, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_FIELDS',
        message: 'Username, email, and password are required'
      });
    }

    // Validate role
    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_ROLE',
        message: 'Invalid role. Must be either "user" or "admin"'
      });
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
      if (existingUser.username === username) {
        return res.status(409).json({
          status: 'error',
          code: 'USERNAME_EXISTS',
          message: 'Username already in use'
        });
      } else {
        return res.status(409).json({
          status: 'error',
          code: 'EMAIL_EXISTS',
          message: 'Email already in use'
        });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'user' // Default to 'user' if no role is provided
      },
    });

    // Remove password from the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {

    if (error.code === 'P2002') {
      // Prisma unique constraint violation
      return res.status(409).json({
        status: 'error',
        code: 'UNIQUE_CONSTRAINT_VIOLATION',
        message: 'Username or email already exists'
      });
    }

    res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
      message: 'An unexpected error occurred while creating the user'
    });
  }
};

// Change user role
exports.changeUserRole = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_ROLE',
        message: 'Invalid role. Must be either "user" or "admin"'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, username: true, email: true, role: true }
    });

    res.json({
      status: 'success',
      message: 'User role updated successfully',
      user: updatedUser
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      });
    }
    res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
      message: 'An unexpected error occurred while updating the user role'
    });
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
