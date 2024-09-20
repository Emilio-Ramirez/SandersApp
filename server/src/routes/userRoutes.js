const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, changeUserRole } = require('../controllers/userController');

// Definir las rutas y asegurarse de que las funciones no estén undefined
router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/role', changeUserRole);  // Por ejemplo, si hay una ruta para cambiar el rol de usuario

module.exports = router;
