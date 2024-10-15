import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import PostSort from '../post-sort';
import PostCard from '../post-card';

import api from '../../../utils/api';
import PostSearch from '../post-search';

export default function BlogView() {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/proyectos');
        console.log('Proyectos:', response.data);
        setProjects(response.data);
      } catch (fetchError) {
        console.error('Error fetching projects:', fetchError);
        setErrorMessage('Failed to load projects. Please try again.');
      }
    };
    fetchProjects();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Proyectos</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Nuevo Proyecto
        </Button>
      </Stack>

      {errorMessage && (
        <Typography color="error" variant="body1">
          {errorMessage}
        </Typography>
      )}

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={projects} />
        <PostSort
          options={[
            { value: 'latest', label: 'Reciente' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Antiguo' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <Grid key={project.id} xs={12} sm={6} md={4}>
              <PostCard
                post={{
                  id: project.id,
                  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
                  title: project.nombre,
                  view: project.estadisticas[0]?.personas_ayudadas || 0,
                  comment: project.donaciones.length,
                  share: 0,
                  author: {
                    name: 'Project Author',
                    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
                  },
                  createdAt: project.fecha_inicio,
                  description: project.descripcion,
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No se encontraron proyectos.</Typography>
        )}
      </Grid>
    </Container>
  );
}
