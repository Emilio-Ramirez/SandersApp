import React, { useState, useEffect } from 'react';

import DonacionTableRow from './donacion-table-row';  
import DonacionTableHead from './donacion-table-head';
import DonacionTableToolbar from './donacion-table-toolbar';

const DonacionTable = () => {
  // State for donations, selection, sorting, and filtering
  const [donaciones, setDonaciones] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('descripcion');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');

  // Fetch donations from the backend API
  useEffect(() => {
    fetch('/api/donaciones-fisicas')
      .then((response) => response.json())
      .then((data) => setDonaciones(data))
      .catch((error) => console.error('Error fetching donations:', error));
  }, []);

  // Handle sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle select all click
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = donaciones.map((n) => n.descripcion);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Handle row selection
  const handleClick = (event, descripcion) => {
    const selectedIndex = selected.indexOf(descripcion);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, descripcion);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Handle filter
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  // Filtered donations based on search filter
  const filteredDonaciones = donaciones.filter((donacion) =>
    donacion.descripcion.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <DonacionTableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />
      <table>
        <DonacionTableHead
          order={order}
          orderBy={orderBy}
          rowCount={donaciones.length}
          headLabel={[
            { id: 'descripcion', label: 'Descripción', align: 'left' },
            { id: 'cantidad', label: 'Cantidad', align: 'left' },
            { id: 'fecha', label: 'Fecha', align: 'left' },
            { id: 'proyecto', label: 'Proyecto', align: 'left' },
          ]}
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
        />
        <tbody>
          {filteredDonaciones.map((row) => (
            <DonacionTableRow
              key={row.id}
              name={row.descripcion}
              company={row.proyecto?.nombre || 'N/A'}
              row={`${row.cantidad}`}
              isVerified
              status="active"
              selected={selected.indexOf(row.descripcion) !== -1}
              handleClick={(event) => handleClick(event, row.descripcion)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonacionTable;
