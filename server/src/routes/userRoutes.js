const express = require('express');
const router = express.Router();
const { getUsers, createUser, getUserById, updateUser, deleteUser, changeUserRole } = require('../controllers/userController');

router.get('/users', getUsers); // Obtener todos los usuarios
router.post('/users', createUser); // Crear nuevo usuario
router.get('/users/:id', getUserById); // Obtener un usuario por ID
router.put('/users/:id', updateUser); // Actualizar un usuario
router.delete('/users/:id', deleteUser); // Eliminar un usuario
router.patch('/users/:id/role', changeUserRole); // Cambiar el rol de un usuario

module.exports = router;
