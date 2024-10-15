import React from 'react';
import PropTypes from 'prop-types';

import { Button, TableRow, TableCell } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function SuscripcionesTableRow({
  id,
  projectName,
  amount,
  startDate,
  endDate,
  status,
  onCancelSubscription
}) {
  return (
    <TableRow>
      <TableCell>{projectName}</TableCell>
      <TableCell>{`$${amount}`}</TableCell>
      <TableCell>{new Date(startDate).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(endDate).toLocaleDateString()}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="error"
          startIcon={<Iconify icon="mdi:cancel" />}
          onClick={() => onCancelSubscription(id)}
          disabled={status !== 'active'}
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
  amount: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onCancelSubscription: PropTypes.func.isRequired
};
