import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

export default function DonacionPage() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [donationAmount, setDonationAmount] = useState('20.00');

  const cards = [
    { id: '1', last4: '4242', brand: 'Visa' },
    { id: '2', last4: '5555', brand: 'Mastercard' },
  ];

  const projects = [
    { id: '1', name: 'Agua para Chiapas' },
    { id: '2', name: 'Pozos en Oaxaca' },
  ];

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" gutterBottom>
          Juntos, Llevamos Agua a Quien Más lo Necesita
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Tu donación ayuda a proporcionar agua limpia a comunidades vulnerables
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={4}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="ion:card" />}
          onClick={() => navigate('/user/my-cards')}
          sx={{
            backgroundColor: '#FFA500',
            '&:hover': { backgroundColor: '#FF8C00' },
            color: 'white',
          }}
        >
          Mis Tarjetas
        </Button>
      </Stack>

      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">Monto de tu Donación</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                style: { fontSize: '2rem', textAlign: 'center' }
              }}
              sx={{
                maxWidth: '300px',
                margin: 'auto',
                '& .MuiOutlinedInput-input': { textAlign: 'center' }
              }}
            />
            <Typography variant="body1" align="center" mt={2}>
              Cada peso cuenta para llevar agua limpia a quienes más lo necesitan
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <Stack spacing={3} sx={{ p: 4 }}>
              <Typography variant="h6">Selecciona un Proyecto</Typography>
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>Elige un proyecto para apoyar</MenuItem>
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                ))}
              </Select>

              <Typography variant="h6" mt={2}>Método de Pago</Typography>
              <Select
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>Selecciona una tarjeta</MenuItem>
                {cards.map((card) => (
                  <MenuItem key={card.id} value={card.id}>
                    {card.brand} terminada en {card.last4}
                  </MenuItem>
                ))}
              </Select>

              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography variant="body2">
                    Hacer de esta una donación mensual
                  </Typography>
                }
              />

              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                sx={{ mt: 2, py: 1.5 }}
              >
                Donar ${donationAmount}
              </Button>

              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography variant="caption">
                  Powered by <Iconify icon="logos:stripe" sx={{ verticalAlign: 'middle', width: 40, height: 'auto' }} />
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="caption" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Términos</Typography>
                  <Typography variant="caption" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacidad</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
