// src/controllers/donacionController.js
const { prisma } = require('../config/database');

exports.getDonaciones = async () => {
  try {
    const donaciones = await prisma.donacion.findMany({
      include: {
        proyecto: true,
        usuario: true,
      },
    });

    const donacionesFisicas = await prisma.donacionFisica.findMany({
      include: {
        proyecto: true,
      },
    });

    return {
      donaciones,
      donacionesFisicas,
    };
  } catch (error) {
    return error;
  }
};
