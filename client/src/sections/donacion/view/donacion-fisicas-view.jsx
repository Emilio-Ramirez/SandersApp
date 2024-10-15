// src/sections/donacion/view/donacion-fisicas-view.jsx

import { useState, useEffect, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import api from 'src/utils/api';
import { useAuth } from 'src/contexts/AuthContext';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import DonacionTableRow from '../donacion-table-row';
import DonacionTableHead from '../donacion-table-head';
import DonacionTableToolbar from '../donacion-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function DonacionesFisicasView() { // Ensure this matches your imports
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('fecha');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [donacionesFisicas, setDonacionesFisicas] = useState([]);

  const { user } = useAuth(); 

  const fetchDonacionesFisicas = useCallback(async () => {
    if (!user || !user.token) {
      console.error('No authentication token found.');
      return;
    }

    try {
      const response = await api.get('/api/donaciones-fisicas');
      setDonacionesFisicas(response.data);
    } catch (err) {
      console.error('Failed to fetch donations:', err);
    }
  }, [user]);

  useEffect(() => {
    fetchDonacionesFisicas();
  }, [fetchDonacionesFisicas]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Donaciones Físicas</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Nueva Donación
        </Button>
      </Stack>

      <TableContainer component={Scrollbar}>
        <Table>
          <DonacionTableHead
            order={order}
            orderBy={orderBy}
            rowCount={donacionesFisicas.length}
            headLabel={[
              { id: 'descripcion', label: 'Descripción' },
              { id: 'cantidad', label: 'Cantidad' },
              { id: 'fecha', label: 'Fecha' },
            ]}
            onRequestSort={handleSort}
          />
          <TableBody>
            {donacionesFisicas.map((row) => (
              <DonacionTableRow key={row.id} {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
