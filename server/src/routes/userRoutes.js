const express = require('express');
const router = express.Router();
const { getUsers, createUser, getUserById, updateUser, deleteUser, onRoleChange } = require('../controllers/userController');

// Definir las rutas y asegurarse de que las funciones no estén undefined
router.post('/users', createUser);
router.get('/', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', onRoleChange); // Ruta para cambiar el rol de un usuario



module.exports = router;
