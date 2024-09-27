const { prisma } = require('../config/database');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
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
const getUserById = async (req, res) => {
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
const createUser = async (req, res) => {
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
            message: `Error creating user: ${error.message}`,
            details: error
        });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(req.params.id, 10) },
            data: {
                username: username || undefined,
                email: email || undefined,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: parseInt(req.params.id, 10) },
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cambiar el rol de un usuario
const changeUserRole = async (req, res) => {
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

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changeUserRole
};
