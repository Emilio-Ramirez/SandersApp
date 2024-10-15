const express = require('express');
const router = express.Router();
const {
  getDonaciones,
  getDonacionById,
  createDonacion,
  updateDonacion,
  deleteDonacion
} = require('../controllers/donacionFisicaController');

router.get('/', getDonaciones); // Main route for fetching donaciones físicas
router.get('/:id', getDonacionById);

module.exports = router;
