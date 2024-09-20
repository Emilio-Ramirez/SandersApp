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

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

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
