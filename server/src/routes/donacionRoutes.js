// src/routes/donacionRoutes.js
const express = require('express');
const router = express.Router();
const donacionController = require('../controllers/donacionController');

router.get('/', async (req, res) => {
  try {
    const donaciones = await donacionController.getDonaciones();
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
