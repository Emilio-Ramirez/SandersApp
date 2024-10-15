// src/pages/admin/donaciones-fisicas.jsx

import { Helmet } from 'react-helmet-async';

import DonacionesFisicasView from 'src/sections/donacion/view/donacion-fisicas-view'; // Correct import path

export default function DonacionesFisicasPage() {
  return (
    <>
      <Helmet>
        <title>Donaciones Físicas</title>
      </Helmet>

      <DonacionesFisicasView /> {/* Render the DonacionesFisicasView */}
    </>
  );
}
