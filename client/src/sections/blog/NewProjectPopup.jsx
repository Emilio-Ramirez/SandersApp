// src/components/NewProjectPopup.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Box,
  Card,
  Stack,
  Button,
  TextField,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

import api from 'src/utils/api';

import SuccessCard from './successCard';

const NewProjectPopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    costo_total: '',
    fecha_inicio: '',
    fecha_fin: '',
    link_ubicacion: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/proyectos', formData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      {showSuccess ? (
        <SuccessCard open={showSuccess} onClose={handleCloseSuccess} />
      ) : (
        <Card
          sx={{
            maxWidth: 600,
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '16px',
            boxShadow: 24,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Nuevo Proyecto
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
                <TextField
                  fullWidth
                  label="Costo Total"
                  name="costo_total"
                  type="number"
                  value={formData.costo_total}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Fecha de Inicio"
                  name="fecha_inicio"
                  type="date"
                  value={formData.fecha_inicio}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <TextField
                  fullWidth
                  label="Fecha de Fin"
                  name="fecha_fin"
                  type="date"
                  value={formData.fecha_fin}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <TextField
                  fullWidth
                  label="Link de Ubicación"
                  name="link_ubicacion"
                  value={formData.link_ubicacion}
                  onChange={handleChange}
                />
              </Stack>
            </form>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 3 }}>
            <Button onClick={onClose} color="inherit">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Crear Proyecto
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

NewProjectPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewProjectPopup;
