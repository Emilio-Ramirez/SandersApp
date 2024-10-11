// src/sections/cards/CardDeletedSuccessCard.jsx
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

const CardDeletedSuccessCard = ({ open, onClose }) => {
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
          backgroundColor: '#e8f5e9',
          border: '2px solid #4caf50',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            ¡Tarjeta Eliminada Exitosamente!
          </Typography>
          <Typography variant="body1">
            La tarjeta ha sido eliminada de tu cuenta.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={onClose} color="primary" variant="contained" size="large">
            Entendido
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

CardDeletedSuccessCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CardDeletedSuccessCard;
