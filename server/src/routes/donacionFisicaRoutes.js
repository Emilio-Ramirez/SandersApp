// server/src/routes/donacionFisicaRoutes.js
const express = require('express');
const router = express.Router();
const {
  getDonaciones,
  getDonacionById,
  createDonacion,
  updateDonacion,
  deleteDonacion,
  getDonacionesByProyecto
} = require('../controllers/donacionFisicaController');

router.get('/', getDonaciones);
router.get('/:id', getDonacionById);
router.post('/', createDonacion);
router.put('/:id', updateDonacion);
router.delete('/:id', deleteDonacion);
router.get('/proyecto/:proyectoId', getDonacionesByProyecto);

module.expos = router;
