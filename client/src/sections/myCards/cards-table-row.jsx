import { useState } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import api from 'src/utils/api';

import Iconify from 'src/components/iconify';

import CardDeleteConfirmation from './CardDeleteConfirmation';
import CardDeletedSuccessCard from './CardDeletedSuccessCard';

export default function CardTableRow({
  id,
  name,
  cardNumber,
  expiryDate,
  onDeleteSuccess,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/api/stripe/payment-methods/${id}`);
      setShowConfirmation(false);
      setShowSuccessCard(true);
      onDeleteSuccess(id);
    } catch (error) {
      console.error('Error deleting payment method:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>
        <TableCell>{cardNumber}</TableCell>
        <TableCell>{expiryDate}</TableCell>
        <TableCell align="right">
          <IconButton 
            onClick={handleDeleteClick} 
            disabled={isDeleting}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CardDeleteConfirmation
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleDeleteConfirm}
        cardNumber={cardNumber}
      />

      <CardDeletedSuccessCard
        open={showSuccessCard}
        onClose={() => setShowSuccessCard(false)}
      />
    </>
  );
}

CardTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  cardNumber: PropTypes.string,
  expiryDate: PropTypes.string,
  onDeleteSuccess: PropTypes.func.isRequired,
};
