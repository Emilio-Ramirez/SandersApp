import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Select,
  Button,
  MenuItem,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

const EditRoleCard = ({ open, onClose, user, onRoleChange }) => {
  const [newRole, setNewRole] = useState(user.role); // Inicializar con el rol actual del usuario

  if (!open) return null;

  const handleChangeRole = () => {
    onRoleChange(user.id, newRole); // Llamar a la función para cambiar el rol
    onClose(); // Cerrar el modal
  };

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
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Editar Rol
          </Typography>
          <Typography variant="body1" paragraph>
            Cambia el rol de <strong>{user.name}</strong>
          </Typography>
          <Select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleChangeRole} color="primary" variant="contained" size="large">
            Guardar Cambios
          </Button>
          <Button onClick={onClose} color="secondary" variant="outlined" size="large">
            Cancelar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

EditRoleCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onRoleChange: PropTypes.func.isRequired,
};

export default EditRoleCard;
