// server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

router.get('/listusers', getUsers);

module.exports = router;
