// src/pages/admin/donacion.jsx

import { Helmet } from 'react-helmet-async';

import DonacionView from 'src/sections/donacion/view/donacion-view'; // Correct import path

export default function DonacionPage() {
  return (
    <>
      <Helmet>
        <title>Donaciones</title>
      </Helmet>

      <DonacionView /> {/* Render the DonacionView */}
    </>
  );
}
