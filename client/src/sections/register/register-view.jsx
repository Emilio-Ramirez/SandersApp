// src/sections/register/register-view.jsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import api from 'src/utils/api';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/auth/register', { username, email, password });
      if (response.status === 201) {
        navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data && typeof err.response.data === 'object') {
          const errorMessages = Object.values(err.response.data).flat().join(', ');
          setError(`Registration failed: ${errorMessages}`);
        } else {
          setError(`Registration failed: ${err.response.status} ${err.response.statusText}`);
        }
      } else if (err.request) {
        setError('No response received from server. Please try again later.');
      } else {
        setError('An error occurred while sending the request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleRegister}>
      <Stack spacing={3} sx={{ mb: 4 }} >
        <TextField
          name="name"
          label="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {
        error && (
          <Typography color="error" variant="body2" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )
      }

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={loading}
        className="mt-8"
      >
        Create account
      </LoadingButton>
    </form >
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
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

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Register to SandersApp</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              variant="subtitle2"
              sx={{ ml: 0.5 }}
            >
              Log in
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
