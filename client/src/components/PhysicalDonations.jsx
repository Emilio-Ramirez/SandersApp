import React, { useState } from 'react';
import { createPhysicalDonation } from '../services/donationService';

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
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Project ID (optional):</label>
        <input type="text" value={proyectoId} onChange={(e) => setProyectoId(e.target.value)} />
      </div>
      <button type="submit">Submit Donation</button>
    </form>
  );
};

export default PhysicalDonations;
