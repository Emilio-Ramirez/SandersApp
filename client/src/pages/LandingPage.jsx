// src/pages/LandingPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const LandingPage = () => (
  <Container maxWidth="sm">
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Our Platform
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Join our community and start making a difference today.
        Our platform connects donors with meaningful projects.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mr: 2 }}
        >
          Log In
        </Button>
        <Button
          component={RouterLink}
          to="/register"
          variant="outlined"
          color="primary"
          size="large"
        >
          Register
        </Button>
      </Box>
    </Box>
  </Container>
);

export default LandingPage;
