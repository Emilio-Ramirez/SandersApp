import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Iconify from 'src/components/iconify';

import PostSort from '../post-sort';
import api from '../../../utils/api';
import PostSearch from '../post-search';

// Definición del componente PostCard
function PostCard({ post }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        image={post.cover}
        alt={post.title}
        sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component={RouterLink} to={`/admin/project/${post.id}`}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Personas ayudadas: {post.view}
        </Typography>
        <Typography variant="caption" display="block">
          Donaciones: {post.comment}
        </Typography>
        <Typography variant="caption" display="block">
          Fecha de inicio: {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

// PropTypes para PostCard
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

export default function BlogView() {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    nombre: '',
    descripcion: '',
  });
  const [dialogError, setDialogError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setNewProject({ nombre: '', descripcion: '' });
    setDialogError('');
  }, []);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCreateProject = useCallback(async () => {
    if (!newProject.nombre || !newProject.descripcion ) {
      setDialogError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const projectData = {
        ...newProject,
        fecha_inicio: new Date().toISOString(),
        estadisticas: [{ personas_ayudadas: 0 }],
        donaciones: [],
      };

      const response = await api.post('/api/proyectos', projectData);
      console.log('Proyecto creado:', response.data);

      setProjects((prevProjects) => [...prevProjects, response.data]);
      handleCloseDialog();
      setSuccessMessage('Proyecto creado exitosamente');
    } catch (error) {
      console.error('Error creating project:', error);
      setDialogError('Failed to create project. Please try again.');
    }
  }, [newProject, handleCloseDialog]);

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Proyectos</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenDialog}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
        <DialogContent>
          {dialogError && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {dialogError}
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre del Proyecto"
            type="text"
            fullWidth
            variant="outlined"
            value={newProject.nombre}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="descripcion"
            label="Descripción"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newProject.descripcion}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCreateProject} variant="contained">Crear</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}