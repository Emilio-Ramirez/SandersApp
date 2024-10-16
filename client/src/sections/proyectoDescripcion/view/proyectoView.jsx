// src/sections/proyectoDescripcion/view/ProyectoView.js
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Card,Container,  CardMedia,Typography,  CardContent } from '@mui/material';

import api from 'src/utils/api';

export default function ProyectoView() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/api/proyectos/${id}`);
        setProject(response.data);
      } catch (fetchError) {  // Changed from 'error' to 'fetchError'
        console.error('Error fetching project:', fetchError);
        setError('Failed to load project details. Please try again.');
      }
    };

  fetchProject();
}, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!project) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={`/assets/images/covers/cover_${project.id % 24 + 1}.jpg`}
          alt={project.nombre}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {project.nombre}
          </Typography>
          <Typography variant="body1" paragraph>
            {project.descripcion}
          </Typography>
          <Typography variant="body2">
            Costo total: ${project.costo_total}
          </Typography>
          <Typography variant="body2">
            Fecha de inicio: {new Date(project.fecha_inicio).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Fecha de fin: {new Date(project.fecha_fin).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Personas ayudadas: {project.estadisticas[0]?.personas_ayudadas || 'N/A'}
          </Typography>
          <Typography variant="body2">
            Donaciones recibidas: {project.donaciones.length}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
