// src/sections/donacion/DonacionPage.jsx
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import { Elements, useStripe } from '@stripe/react-stripe-js';

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

import api from 'src/utils/api';

import Iconify from 'src/components/iconify';

import SuccessCard from '../SuccessCard';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function DonacionPageContent() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [donationAmount, setDonationAmount] = useState('20.00');
  const [isMensual, setIsMensual] = useState(false);
  const [projects, setProjects] = useState([]);
  const [cards, setCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  useEffect(() => {
    // Fetch projects
    api.get('/api/proyectos')
      .then(response => setProjects(response.data))
      .catch((fetchError) => {
        console.error('Error fetching projects:', fetchError);
        setErrorMessage('Failed to load projects. Please try again.');
      });

    // Fetch cards
    api.get('/api/stripe/payment-methods')
      .then(response => setCards(response.data))
      .catch((fetchError) => {
        console.error('Error fetching cards:', fetchError);
        setErrorMessage('Failed to load payment methods. Please try again.');
      });
  }, []);

  const handleDonation = async () => {
    if (!stripe) {
      setErrorMessage('Stripe has not been initialized.');
      return;
    }

    try {
      const return_url = `${window.location.origin}/donation-result`;
      const response = await api.post('api/stripe/process-user-donation', {
        projectId: parseInt(selectedProject, 10),
        amount: Math.round(parseFloat(donationAmount) * 100), // Convert to cents
        currency: 'mxn',
        isMensual,
        paymentMethodId: selectedCard,
        return_url,
      });

      if (response.data.clientSecret) {
        if (isMensual) {
          // Handle subscription
          const { error } = await stripe.confirmCardPayment(response.data.clientSecret);
          if (error) {
            throw new Error(error.message);
          }
        } else {
          // Handle one-time payment
          const { error, paymentIntent } = await stripe.confirmCardPayment(response.data.clientSecret);
          if (error) {
            throw new Error(error.message);
          } else if (paymentIntent.status === 'requires_action') {
            // Handle 3D Secure authentication
            const { error: actionError } = await stripe.handleCardAction(response.data.clientSecret);
            if (actionError) {
              throw new Error(actionError.message);
            }
          }
        }
        setOpenSuccessDialog(true);
      } else {
        throw new Error('No client secret received from the server');
      }
    } catch (donationError) {
      console.error('Error processing donation:', donationError);
      if (donationError.response) {
        console.error('Server response:', donationError.response.data);
        setErrorMessage(`Error: ${donationError.response.data.error || 'Unknown server error'}`);
      } else {
        setErrorMessage('There was an error processing your donation. Please try again.');
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate('/user/donacion'); // or wherever you want to redirect after successful donation
  };

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

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3 }}>
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
                  <MenuItem key={project.id} value={project.id}>{project.nombre}</MenuItem>
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
                    {card.card.brand} terminada en {card.card.last4}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="outlined"
                startIcon={<Iconify icon="mdi:credit-card-plus-outline" />}
                onClick={() => navigate('/user/new-card')}
              >
                Agregar Nueva Tarjeta
              </Button>

              <FormControlLabel
                control={<Checkbox checked={isMensual} onChange={(e) => setIsMensual(e.target.checked)} />}
                label={
                  <Typography variant="body2">
                    Hacer de esta una donación mensual
                  </Typography>
                }
              />

              {errorMessage && <Typography color="error">{errorMessage}</Typography>}

              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                sx={{ mt: 2, py: 1.5 }}
                onClick={handleDonation}
                disabled={!selectedProject || !selectedCard}
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
      <SuccessCard open={openSuccessDialog} onClose={handleCloseSuccessDialog} />
    </Container>
  );
}

export default function DonacionPage() {
  return (
    <Elements stripe={stripePromise}>
      <DonacionPageContent />
    </Elements>
  );
}
