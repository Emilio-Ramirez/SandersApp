const { prisma } = require('../config/database');
const bcrypt = require('bcrypt');
const { createStripeCustomer, deleteStripeCustomer } = require('./stripeController');

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

exports.createUser = async (req, res) => {
  let stripeCustomer = null;
  try {
    const { username, email, password, role } = req.body;

    // Validaciones existentes...
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

        // Excluir la contraseña del objeto devuelto
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user: userWithoutPassword
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: `Error creating user: ${error.message}`,  // Detallar el error
            details: error
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario primero
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'user'
      },
    });

    // Crear el cliente de Stripe
    stripeCustomer = await createStripeCustomer(newUser);

    // Actualizar el usuario con el ID del cliente de Stripe
    const updatedUser = await prisma.user.update({
      where: { id: newUser.id },
      data: { stripeCustomerId: stripeCustomer.id }
    });

    // Eliminar la contraseña de la respuesta
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: __, ...userWithoutPassword } = updatedUser;


    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user: userWithoutPassword
    });

} catch (error) {
    // If a Stripe customer was created but there was an error afterwards, delete the Stripe customer
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
        return; // Add this to prevent further execution
      }
    }

    // Handle different types of errors
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
};// Change user role
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
            where: { id: parseInt(req.params.id, 10) },
            data: {
                username: username || undefined,  // Evitar que campos vacíos causen errores
                email: email || undefined,
            },
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
            where: { id: parseInt(req.params.id, 10) },
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Change user role
exports.changeUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                status: 'error',
                code: 'INVALID_ROLE',
                message: 'Invalid role. Must be either "user" or "admin"'
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: { role },
        });

        res.json({
            status: 'success',
            message: 'User role updated successfully',
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating role',
            details: error.message
        });
    }
};
