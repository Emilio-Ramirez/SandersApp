import React from 'react';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import { Button, TableRow, TableCell } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function SuscripcionesTableRow({
  id,
  projectName,
  userName,
  amount,
  startDate,
  endDate,
  stripe_subscription_id,
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
        <Link
          href={`https://dashboard.stripe.com/subscriptions/${stripe_subscription_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {stripe_subscription_id}
        </Link>
      </TableCell>
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
  id: PropTypes.number.isRequired,
  projectName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  stripe_subscription_id: PropTypes.string.isRequired,
  onOpenDialog: PropTypes.func.isRequired,
};
