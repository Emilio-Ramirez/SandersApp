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
import DonacionTableRow from '../donacion-table-row';
import DonacionTableHead from '../donacion-table-head';
import DonacionTableToolbar from '../donacion-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function DonacionPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [donaciones, setDonaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        const response = await api.get('/api/stripe/user-donations');
        setDonaciones(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    fetchDonaciones();
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

  const dataFiltered = applyFilter({
    inputData: donaciones,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Mis Donaciones</Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FFA500', // Orange
            '&:hover': {
              backgroundColor: '#FF8C00', // Dark Orange
            },
            color: 'white',
          }}
          startIcon={<Iconify icon="ion:card" />}
          onClick={() => navigate('/user/my-cards')}
        >
          Mis Tarjetas
        </Button>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/user/new-donation')}
        >
          Nueva Donación
        </Button>
      </Stack>

      <Card>
        <DonacionTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <DonacionTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'projectName', label: 'Project Name' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'date', label: 'Date' },
                  { id: 'isMonthly', label: 'Monthly' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <DonacionTableRow
                      key={row.id}
                      projectName={row.projectName}
                      amount={row.amount}
                      date={row.date}
                      isMonthly={row.isMonthly}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, donaciones.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={donaciones.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
