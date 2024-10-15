// server/src/controllers/proyectoController.js
const { prisma } = require('../config/database');

exports.getProyectos = async (req, res) => {
  try {
    const proyectos = await prisma.proyecto.findMany({
      include: {
        donaciones: true,
        donacionesFisicas: true,
        estadisticas: true,
      }
    });
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching projects',
      details: error.message
    });
  }
};

exports.getProyectoById = async (req, res) => {
  try {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        donaciones: true,
        donacionesFisicas: true,
        estadisticas: true,
      }
    });
    if (!proyecto) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching project',
      details: error.message
    });
  }
};

exports.createProyecto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      costo_total,
      fecha_inicio,
      fecha_fin,
      link_ubicacion,
      estado_trazabilidad
    } = req.body;

    const projectData = {
      nombre,
      descripcion,
      costo_total: parseFloat(costo_total),
      suma_recaudada: 0, // Initialize with 0 or any default value
      fecha_inicio: new Date(fecha_inicio),
      fecha_fin: new Date(fecha_fin),
      link_ubicacion,
      estado_trazabilidad: estado_trazabilidad ? JSON.parse(estado_trazabilidad) : {},
    };

    const newProyecto = await prisma.proyecto.create({
      data: projectData,
    });

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      proyecto: newProyecto
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating project',
      details: error.message
    });
  }
};

exports.updateProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      descripcion,
      costo_total,
      fecha_inicio,
      fecha_fin,
      link_ubicacion,
      estado_trazabilidad
    } = req.body;

    const updatedProyecto = await prisma.proyecto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        descripcion,
        costo_total: parseFloat(costo_total),
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        link_ubicacion,
        estado_trazabilidad: JSON.parse(estado_trazabilidad),
      },
    });

    res.json({
      status: 'success',
      message: 'Project updated successfully',
      proyecto: updatedProyecto
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating project',
      details: error.message
    });
  }
};

exports.deleteProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.proyecto.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      status: 'success',
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting project',
      details: error.message
    });
  }
};
