import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function DonacionTableRow({
  projectName,
  amount,
  date,
  isMonthly,
}) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>{projectName}</TableCell>
      <TableCell>${amount}</TableCell>
      <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
      <TableCell>{isMonthly ? 'Yes' : 'No'}</TableCell>
    </TableRow>
  );
}

DonacionTableRow.propTypes = {
  projectName: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isMonthly: PropTypes.bool.isRequired,
};
