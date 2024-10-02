// src/sections/cards/CardAddedSuccessCard.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

const CardAddedSuccessCard = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/user/my-cards'); // Redirect to the cards page
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
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
            ¡Tarjeta Agregada Exitosamente!
          </Typography>
          <Typography variant="body1" paragraph>
            Tu nueva tarjeta ha sido agregada a tu cuenta.
          </Typography>
          <Typography variant="body1">
            Ahora puedes usar esta tarjeta para futuras donaciones.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleClose} color="primary" variant="contained" size="large">
            Ver Mis Tarjetas
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

CardAddedSuccessCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CardAddedSuccessCard;
