// src/sections/donacion/SuccessCard.jsx
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

const SuccessCard = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '90%',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: 24,
          backgroundColor: '#e8f5e9', // Light green background
          border: '2px solid #4caf50', // Green border
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            ¡Donación Exitosa!
          </Typography>
          <Typography variant="body1" paragraph>
            Gracias por tu generosidad. Tu donación ayudará a llevar agua limpia a quienes más lo necesitan.
          </Typography>
          <Typography variant="body1">
            Tu impacto es significativo. Juntos estamos haciendo la diferencia.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={onClose} color="primary" variant="contained" size="large">
            Volver a Inicio
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

SuccessCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessCard;
