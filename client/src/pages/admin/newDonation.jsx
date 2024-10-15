// React Imports
import { useState } from 'react';

// MUI Components
import { Stack, Button, Container, TextField, Typography } from '@mui/material';

// API Utilities
import api from 'src/utils/api';

export default function NewDonation() {
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/donaciones-fisicas', { cantidad, descripcion, fecha });
      alert('Donación física agregada correctamente');
    } catch (error) {
      console.error('Error al agregar donación:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Nueva Donación Física
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <TextField
            label="Fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" type="submit">
            Guardar Donación
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
