import React, { useState } from 'react';

import { createPhysicalDonation } from '../../services/donationService';

const PhysicalDonations = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [proyectoId, setProyectoId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { cantidad: amount, fecha: date, descripcion: description, proyectoId };
    const response = await createPhysicalDonation(data);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">
          Amount:
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
          Date:
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
          Description:
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
          Project ID (optional):
          <input
            id="proyectoId"
            name="proyectoId"
            type="text"
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit Donation</button>
    </form>
  );
};

export default PhysicalDonations;
