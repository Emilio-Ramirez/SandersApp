// src/pages/payWithStripe.jsx 

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function DonacionPage() {
  const [country, setCountry] = useState('Mexico');
  const [donationAmount, setDonationAmount] = useState('20.00');

  const handleDonationChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts[0].length > 7) return; // Limit to 7 digits before decimal
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, 2); // Limit to 2 decimal places
      setDonationAmount(parts.join('.'));
    } else {
      setDonationAmount(value);
    }
  };

  const formattedDonationAmount = Number(donationAmount).toFixed(2);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
        component={RouterLink} to="/"
      />
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 5 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" gutterBottom>
            Juntos, Llevamos Agua a Quien Más lo Necesita
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Tu donación ayuda a proporcionar agua limpia a comunidades vulnerables
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 4 }}>
              <Typography variant="h4" gutterBottom align="center">Monto de tu Donación</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={formattedDonationAmount}
                onChange={handleDonationChange}
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
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  ¿Quieres donar a un proyecto específico y ver su progreso?
                  <Link component={RouterLink} to="/register" sx={{ ml: 1 }}>
                    Regístrate aquí
                  </Link>
                </Typography>
              </Alert>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={3} sx={{ p: 4 }}>
                <Typography variant="subtitle1" align="center">
                  Información de Pago
                </Typography>

                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                />

                <Typography variant="subtitle2">Información de la Tarjeta</Typography>
                <TextField
                  fullWidth
                  placeholder="1234 1234 1234 1234"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Stack direction="row" spacing={1}>
                          <Iconify icon="logos:visa" />
                          <Iconify icon="logos:mastercard" />
                          <Iconify icon="logos:amex" />
                          <Iconify icon="logos:jcb" />
                        </Stack>
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    placeholder="MM / YY"
                    variant="outlined"
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                  <TextField
                    placeholder="CVC"
                    variant="outlined"
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Nombre del titular"
                  placeholder="Nombre completo en la tarjeta"
                  variant="outlined"
                  size="small"
                />

                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Mexico">México</MenuItem>
                  {/* Add more countries as needed */}
                </Select>

                <Button variant="contained" fullWidth color="primary" size="large">
                  Donar ${formattedDonationAmount}
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  ¿Quieres hacer donaciones mensuales y recibir actualizaciones?{' '}
                  <Link component={RouterLink} to="/register">
                    Regístrate aquí
                  </Link>
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Powered by</Typography>
                    <Iconify
                      icon="logos:stripe"
                      sx={{
                        width: 40,
                        height: 'auto'
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
