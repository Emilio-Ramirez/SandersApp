// src/pages/admin/projectDescription.jsx
import { Helmet } from 'react-helmet-async';

import { ProyectoView } from 'src/sections/proyectoDescripcion/view';

export default function ProyectoPage() {
  return (
    <>
      <Helmet>
        <title> Proyecto </title>
      </Helmet>
      <ProyectoView />
    </>
  );
}
