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
import TableEmptyRows from '../table-empty-rows';
import SuscripcionesTableRow from '../suscripciones-table-row';
import SuscripcionesTableHead from '../suscripciones-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';
import SuscripcionesTableToolbar from '../suscripciones-table-toolbar';

export default function SuscripcionesView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fecha_inicio');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [suscripciones, setSuscripciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuscripciones();
  }, []);

  const fetchSuscripciones = async () => {
    try {
      const response = await api.get('/api/suscripciones/user');
      setSuscripciones(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      await api.post(`/api/stripe/subscriptions/cancel/${subscriptionId}`);
      // Refresh the subscriptions list after cancellation
      fetchSuscripciones();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

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

  const dataFiltered = applyFilter({
    inputData: suscripciones,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Mis Suscripciones</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/user/new-subscription')}
        >
          Nueva Suscripción
        </Button>
      </Stack>

      <Card>
        <SuscripcionesTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <SuscripcionesTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'proyecto.nombre', label: 'Project Name' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'fecha_inicio', label: 'Start Date' },
                  { id: 'currentPeriodEnd', label: 'End Date' },
                  { id: 'status', label: 'Status' },
                  { id: 'actions', label: 'Actions' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <SuscripcionesTableRow
                      key={row.id}
                      id={row.id}
                      projectName={row.proyecto.nombre}
                      amount={row.amount}
                      startDate={row.fecha_inicio}
                      endDate={row.currentPeriodEnd}
                      status={row.status}
                      onCancelSubscription={handleCancelSubscription}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, suscripciones.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={suscripciones.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
