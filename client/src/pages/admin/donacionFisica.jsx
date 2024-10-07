import React, { useState } from 'react';

import { createPhysicalDonation } from '../../services/donationService'; 

const DonacionFisica = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [proyectoId, setProyectoId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { cantidad: amount, fecha: date, descripcion: description, proyectoId };
    try {
      const response = await createPhysicalDonation(data);
      console.log(response);
      alert('Donación física creada con éxito');
    } catch (error) {
      console.error('Error al crear la donación física:', error);
      alert('Hubo un error al crear la donación.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">
          Cantidad:
          <input
            id="amount"
            name="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="date">
          Fecha:
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Descripción:
          <input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="proyectoId">
          ID del Proyecto (opcional):
          <input
            id="proyectoId"
            name="proyectoId"
            type="text"
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Enviar Donación Física</button>
    </form>
  );
};

export default DonacionFisica;
