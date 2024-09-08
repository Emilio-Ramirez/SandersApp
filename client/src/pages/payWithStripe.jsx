import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={4} sx={{ flexGrow: 1 }}>
          {/* Left side - Title and Price */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4" gutterBottom align="center">Gracias por donar</Typography>
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
            </Box>
          </Grid>

          {/* Right side - Payment Form */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <Card sx={{ width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
              <Stack spacing={2} sx={{ p: 3 }}>
                <Typography variant="subtitle1" align="center">
                  Pay with card
                </Typography>

                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                />

                <Typography variant="subtitle2">Card information</Typography>
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
                  label="Cardholder name"
                  placeholder="Full name on card"
                  variant="outlined"
                  size="small"
                />

                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Mexico">Mexico</MenuItem>
                </Select>

                <Button variant="contained" fullWidth color="primary">
                  Pay ${formattedDonationAmount}
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
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
