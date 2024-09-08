// src/pages/AddCardPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

export default function AddCardPage() {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the card details to your backend or payment processor
    console.log('Card details submitted:', cardDetails);
    // After successful addition, navigate back to the cards list
    navigate('/user/cards');
  };

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

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Cardholder Name"
                name="cardholderName"
                value={cardDetails.cardholderName}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Stack direction="row" spacing={1}>
                        <Iconify icon="logos:visa" />
                        <Iconify icon="logos:mastercard" />
                        <Iconify icon="logos:amex" />
                      </Stack>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Expiry Date"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleChange}
                  required
                  sx={{ flexGrow: 1 }}
                />
                <TextField
                  label="CVC"
                  name="cvc"
                  value={cardDetails.cvc}
                  onChange={handleChange}
                  required
                  sx={{ flexGrow: 1 }}
                />
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Add Card
              </Button>
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
          </form>
        </Card>
      </Container>
    </Box>
  );
}
