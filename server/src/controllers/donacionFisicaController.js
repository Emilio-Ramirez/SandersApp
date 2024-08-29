// server/src/controller/DonacionFisicaController.js
const { prisma } = require('../config/database');

// Get all donaciones físicas
exports.getDonaciones = async (req, res) => {
  try {
    const donaciones = await prisma.donacionFisica.findMany({
      include: {
        proyecto: true,
      }
    });
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a single donación física by ID
exports.getDonacionById = async (req, res) => {
  try {
    const donacion = await prisma.donacionFisica.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        proyecto: true,
      }
    });
    if (!donacion) {
      return res.status(404).json({ message: 'Donación física not found' });
    }
    res.json(donacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new donación física
exports.createDonacion = async (req, res) => {
  try {
    const data = {
      cantidad: parseFloat(req.body.cantidad),
      fecha: new Date(req.body.fecha),
      descripcion: req.body.descripcion,
    };

    // Only add proyectoId if it's provided and not null
    if (req.body.proyectoId) {
      // Check if the proyecto exists
      const proyecto = await prisma.proyecto.findUnique({
        where: { id: parseInt(req.body.proyectoId) }
      });

      if (!proyecto) {
        return res.status(400).json({ message: "Proyecto not found" });
      }

      data.proyectoId = parseInt(req.body.proyectoId);
    }

    const newDonacion = await prisma.donacionFisica.create({ data });
    res.status(201).json(newDonacion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update a donación física
exports.updateDonacion = async (req, res) => {
  try {
    const data = {};
    if (req.body.cantidad) data.cantidad = parseFloat(req.body.cantidad);
    if (req.body.fecha) data.fecha = new Date(req.body.fecha);
    if (req.body.descripcion) data.descripcion = req.body.descripcion;
    if (req.body.proyectoId) {
      data.proyectoId = req.body.proyectoId === null ? null : parseInt(req.body.proyectoId);
    }

    const updatedDonacion = await prisma.donacionFisica.update({
      where: { id: parseInt(req.params.id) },
      data
    });
    res.json(updatedDonacion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a donación física
exports.deleteDonacion = async (req, res) => {
  try {
    await prisma.donacionFisica.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Donación física deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get donaciones físicas by project
exports.getDonacionesByProyecto = async (req, res) => {
  try {
    const donaciones = await prisma.donacionFisica.findMany({
      where: { proyectoId: parseInt(req.params.proyectoId) },
      include: {
        proyecto: true,
      }
    });
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
