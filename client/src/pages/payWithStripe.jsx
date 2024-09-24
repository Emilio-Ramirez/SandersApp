// src/pages/payWithStripe.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Link as RouterLink } from 'react-router-dom';
import { Elements, useStripe, CardElement, useElements } from '@stripe/react-stripe-js';

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

import api from 'src/utils/api';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import SuccessCard from '../sections/stripePay/SuccessCard';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ donationAmount, onSuccessfulDonation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data: { clientSecret } } = await api.post('/api/stripe/process-donation', {
        amount: Math.round(donationAmount * 100),
        currency: 'mxn',
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        await api.post('/api/stripe/record-successful-donation', {
          paymentIntentId: result.paymentIntent.id,
          email,
        });
        onSuccessfulDonation();
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        size="small"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="primary"
        size="large"
        disabled={!stripe || processing}
        sx={{ mt: 2 }}
      >
        {processing ? 'Processing...' : `Donar $${donationAmount}`}
      </Button>
    </form>
  );
};

CheckoutForm.propTypes = {
  donationAmount: PropTypes.number.isRequired,
  onSuccessfulDonation: PropTypes.func.isRequired,
};

export default function DonacionPage() {
  const [country, setCountry] = useState('Mexico');
  const [donationAmount, setDonationAmount] = useState('20.00');
  const [openDialog, setOpenDialog] = useState(false);

  const handleDonationChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts[0].length > 7) return;
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, 2);
      setDonationAmount(parts.join('.'));
    } else {
      setDonationAmount(value);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    donationAmount={Number(donationAmount)} 
                    onSuccessfulDonation={() => setOpenDialog(true)}
                  />
                </Elements>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Mexico">México</MenuItem>
                  {/* Add more countries as needed */}
                </Select>

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
      <SuccessCard open={openDialog} onClose={handleCloseDialog} />
    </Box>
  );
}
