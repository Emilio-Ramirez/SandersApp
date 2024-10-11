// src/pages/AddCardPage.jsj

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, CardElement, useElements } from '@stripe/react-stripe-js';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import api from 'src/utils/api';

import Iconify from 'src/components/iconify';

import CardAddedSuccessCard from '../CardAddedSuccessCard';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardholderName, setCardholderName] = useState('');
  const [openSuccessCard, setOpenSuccessCard] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name: cardholderName },
    });
    if (stripeError) {
      setError(stripeError.message);
    } else {
      try {
        const response = await api.post('/api/stripe/add-payment-method', {
          paymentMethodId: paymentMethod.id,
        });
        if (response.status === 200) {
          setOpenSuccessCard(true);
        } else {
          setError(response.data.error || 'An unexpected error occurred');
        }
      } catch (fetchError) {
        console.error('Detailed error:', fetchError.response?.data || fetchError);
        setError(fetchError.response?.data?.error || 'Network error. Please try again.');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Cardholder Name"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
          />
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe}
          >
            Add Card
          </Button>
        </Stack>
      </form>

      <CardAddedSuccessCard 
        open={openSuccessCard} 
        onClose={() => setOpenSuccessCard(false)}
      />
    </>
  );
};

export default function AddCardPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card sx={{ p: 5 }}>
          <Typography variant="h4" gutterBottom align="center">
            Add New Card
          </Typography>
          <Elements stripe={stripePromise}>
            <CardForm />
          </Elements>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
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
        </Card>
      </Container>
    </Box>
  );
}
