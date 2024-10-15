import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DialogContentText from '@mui/material/DialogContentText';

import api from 'src/utils/api';

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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  useEffect(() => {
    fetchSuscripciones();
  }, []);

  const fetchSuscripciones = async () => {
    try {
      const response = await api.get('/api/suscripciones/all');
      const activeSuscripciones = response.data.filter(sub => sub.estado === 'active');
      setSuscripciones(activeSuscripciones);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleOpenDialog = (subscriptionId) => {
    setSelectedSubscription(subscriptionId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSubscription(null);
  };

  const handleCancelSubscription = async () => {
    try {
      await api.post(`/api/stripe/subscriptions/cancel/${selectedSubscription}`);
      handleCloseDialog();
      fetchSuscripciones();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
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
        <Typography variant="h4">Suscripciones Activas</Typography>

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
                  { id: 'usuario.username', label: 'User' },
                  { id: 'cantidad', label: 'Amount' },
                  { id: 'fecha_inicio', label: 'Start Date' },
                  { id: 'fecha_fin', label: 'End Date' },
                  { id: 'actions', label: 'Actions' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <SuscripcionesTableRow
                      key={row.id}
                      id={row.stripe_subscription_id}
                      projectName={row.proyecto.nombre}
                      userName={row.usuario.username}
                      amount={row.cantidad}
                      startDate={row.fecha_inicio}
                      endDate={row.fecha_fin}
                      onOpenDialog={handleOpenDialog}
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar cancelación de suscripción
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de que desea cancelar esta suscripción? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCancelSubscription} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
