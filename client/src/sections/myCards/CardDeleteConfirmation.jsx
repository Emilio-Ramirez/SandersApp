// src/sections/cards/CardDeleteConfirmation.jsx
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

const CardDeleteConfirmation = ({ open, onClose, onConfirm, cardNumber }) => {
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '90%',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: 24,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            ¿Estás seguro?
          </Typography>
          <Typography variant="body1" paragraph>
            ¿Deseas eliminar la tarjeta terminada en {cardNumber.slice(-4)}?
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={onClose} color="primary" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

CardDeleteConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cardNumber: PropTypes.string.isRequired,
};

export default CardDeleteConfirmation;
