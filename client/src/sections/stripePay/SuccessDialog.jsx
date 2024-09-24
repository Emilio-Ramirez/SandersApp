import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Dialog,
  Button,
  Typography,
  DialogContent,
  DialogActions
} from '@mui/material';

const SuccessDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/'); // Redirige a la página de inicio
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '70vh',
          maxHeight: '90vh',
          width: '80%',
          maxWidth: '800px',
          borderRadius: '16px',
        }
      }}
    >
      <DialogContent sx={{ p: 6 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h2" gutterBottom color="primary">
            ¡Donación Exitosa!
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
            Gracias por tu generosidad. Tu donación ayudará a llevar agua limpia a quienes más lo necesitan.
          </Typography>
          <img
            src="/path-to-your-thank-you-image.jpg"
            alt="Gracias por tu donación"
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '2rem', borderRadius: '8px' }}
          />
          <Typography variant="h5" color="text.primary" sx={{ mt: 4 }}>
            Tu impacto es significativo. Juntos estamos haciendo la diferencia.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 6 }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          size="large"
          sx={{ minWidth: 250, fontSize: '1.2rem', py: 1.5 }}
        >
          Volver a Inicio
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SuccessDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessDialog;
