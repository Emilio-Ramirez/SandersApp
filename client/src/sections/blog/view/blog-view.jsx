import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Iconify from 'src/components/iconify';

import PostSort from '../post-sort';
import api from '../../../utils/api';
import PostSearch from '../post-search';
import NewProjectPopup from '../NewProjectPopup';

export default function BlogView() {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openNewProjectPopup, setOpenNewProjectPopup] = useState(false);


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

  const handleNewProjectClick = () => {
    setOpenNewProjectPopup(true);
  };

  const handleCloseNewProjectPopup = () => {
    setOpenNewProjectPopup(false);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/api/proyectos/${projectId}`);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      setErrorMessage('Failed to delete project. Please try again.');
    }
  };

  const handleEditProject = (projectId) => {
    // Navigate to edit page or open edit modal
    console.log('Edit project:', projectId);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Proyectos</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleNewProjectClick}
        >
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
                  description: project.descripcion,
                }}
                onDelete={handleDeleteProject}
                onEdit={handleEditProject}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No se encontraron proyectos.</Typography>
        )}
      </Grid>
      <NewProjectPopup
        open={openNewProjectPopup}
        onClose={handleCloseNewProjectPopup}
      />
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
 

