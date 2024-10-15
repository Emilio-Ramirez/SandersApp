import React from 'react';
import PropTypes from 'prop-types';

import { Button, TableRow, TableCell } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function SuscripcionesTableRow({
  id,
  projectName,
  userName,
  amount,
  startDate,
  endDate,
  onOpenDialog
}) {
  return (
    <TableRow>
      <TableCell>{projectName}</TableCell>
      <TableCell>{userName}</TableCell>
      <TableCell>{`$${amount}`}</TableCell>
      <TableCell>{new Date(startDate).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(endDate).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="error"
          startIcon={<Iconify icon="mdi:cancel" />}
          onClick={() => onOpenDialog(id)}
        >
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}

SuscripcionesTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onOpenDialog: PropTypes.func.isRequired
};
