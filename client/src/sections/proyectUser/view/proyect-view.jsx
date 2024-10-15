import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import PostSort from '../post-sort';
import api from '../../../utils/api';
import PostSearch from '../post-search';


export default function ProyectView() {
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
    <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>

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

// Añadir PropTypes para validar las propiedades que se pasan a PostCard
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    view: PropTypes.number,
    comment: PropTypes.number,
    share: PropTypes.number,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const imageStyles = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
};

export function PostCard({ post }) {
  return (
    <Card sx={cardStyles}>
      <CardMedia
        component="img"
        image={post.cover}
        alt={post.title}
        sx={imageStyles}
      />
      <CardContent>
        <Typography variant="h6" component={RouterLink} to={`/admin/project/${post.id}`}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
