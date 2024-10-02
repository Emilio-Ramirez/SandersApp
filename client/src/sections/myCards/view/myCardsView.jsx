import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import api from 'src/utils/api';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import CardTableRow from '../cards-table-row';
import CardTableHead from '../cards-table-head';
import TableEmptyRows from '../table-empty-rows';
import CardTableToolbar from '../cards-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function MyCardsPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get('/api/stripe/payment-methods');
        const formattedCards = response.data.map(card => ({
          id: card.id,
          name: card.billing_details.name || 'Unnamed Card',
          cardNumber: `**** **** **** ${card.card.last4}`,
          expiryDate: `${card.card.exp_month.toString().padStart(2, '0')}/${card.card.exp_year.toString().slice(-2)}`,
        }));
        setCards(formattedCards);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    fetchCards();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteSuccess = (deletedCardId) => {
    setCards(prevCards => prevCards.filter(card => card.id !== deletedCardId));
  };

  const dataFiltered = applyFilter({
    inputData: cards,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Mis Tarjetas</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/user/new-card')}
        >
          Agregar Tarjeta
        </Button>
      </Stack>

      <Card>
        <CardTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CardTableHead
                order={order}
                orderBy={orderBy}
                rowCount={cards.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'cardNumber', label: 'Card Number' },
                  { id: 'expiryDate', label: 'Expiry Date' },
                  { id: '', label: 'Actions', align: 'right' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CardTableRow
                      key={row.id}
                      id ={row.id}
                      name={row.name}
                      cardNumber={row.cardNumber}
                      expiryDate={row.expiryDate}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, cards.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={cards.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
