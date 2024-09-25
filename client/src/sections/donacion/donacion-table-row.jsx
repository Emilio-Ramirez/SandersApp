import { useState } from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

import Iconify from 'src/components/iconify';

// Styled component for the clickable price
const ClickablePrice = styled(Link)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

export default function DonacionTableRow({
  selected,
  cantidad,
  email,
  es_mensual,
  fecha,
  proyecto,
  stripe_id,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handlePriceClick = () => {
    window.open(`https://dashboard.stripe.com/test/payments/${stripe_id}`, '_blank');
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>
          <ClickablePrice onClick={handlePriceClick}>
            ${Number(cantidad).toFixed(2)}
          </ClickablePrice>
        </TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{es_mensual ? 'Mensual' : 'Única'}</TableCell>
        <TableCell>{new Date(fecha).toLocaleDateString()}</TableCell>
        <TableCell>{proyecto ? proyecto.nombre : 'Sin asignar'}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

DonacionTableRow.propTypes = {
  cantidad: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  es_mensual: PropTypes.bool.isRequired,
  fecha: PropTypes.string.isRequired,
  proyecto: PropTypes.object,
  stripe_id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
