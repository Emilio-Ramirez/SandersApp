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
    <label htmlFor="amount">Amount:</label>
    <input
      id="amount"
      name="amount"
      type="text"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="date">Date:</label>
    <input
      id="date"
      name="date"
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="description">Description:</label>
    <input
      id="description"
      name="description"
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="proyectoId">Project ID (optional):</label>
    <input
      id="proyectoId"
      name="proyectoId"
      type="text"
      value={proyectoId}
      onChange={(e) => setProyectoId(e.target.value)}
    />
  </div>

  <button type="submit">Submit Donation</button>
</form>

  );
};

export default PhysicalDonations;
