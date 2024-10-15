const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ruta para obtener estadísticas del dashboard
router.get('/stats', async (req, res) => {
  try {
    const totalDonaciones = await prisma.donacion.count();
    const cantidadTotal = await prisma.donacion.aggregate({
      _sum: { cantidad: true },
    });

    const proyectos = await prisma.proyecto.findMany({
      include: {
        donaciones: true,
      },
    });

    res.json({
      totalDonaciones,
      cantidadTotal: cantidadTotal._sum.cantidad || 0,
      proyectos: proyectos.map((proyecto) => ({
        nombre: proyecto.nombre,
        totalDonaciones: proyecto.donaciones.length,
      })),
    });
  } catch (error) {
    console.error('Error al obtener estadísticas del dashboard:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
});

module.exports = router;
