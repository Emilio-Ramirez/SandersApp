const { prisma } = require('../config/database');
const bcrypt = require('bcrypt');
const { createStripeCustomer, deleteStripeCustomer } = require('./stripeController');

// Obtener todos los usuarios
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

// Obtener un solo usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  let stripeCustomer = null;
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_FIELDS',
        message: 'Username, email, and password are required'
      });
    }

    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_ROLE',
        message: 'Invalid role. Must be either "user" or "admin"'
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        code: 'DUPLICATE',
        message: 'Username or email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'user',
      },
    });

    // Crear el cliente de Stripe
    stripeCustomer = await createStripeCustomer(newUser);

    // Actualizar el usuario con el ID del cliente de Stripe
    const updatedUser = await prisma.user.update({
      where: { id: newUser.id },
      data: { stripeCustomerId: stripeCustomer.id }
    });

    const userWithoutPassword = { ...updatedUser };
    delete userWithoutPassword.password;

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    if (stripeCustomer) {
      try {
        await deleteStripeCustomer(stripeCustomer.id);
      } catch (deleteError) {
        res.status(500).json({
          status: 'error',
          code: 'STRIPE_CUSTOMER_DELETE_ERROR',
          message: 'An error occurred while deleting the Stripe customer',
          error: deleteError.message
        });
        return;
      }
    }

    if (error.code === 'P2002') {
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

// Cambiar el rol de un usuario
exports.changeUserRole = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;

    // Validar el rol
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

// Actualizar un usuario
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

// Eliminar un usuario
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
