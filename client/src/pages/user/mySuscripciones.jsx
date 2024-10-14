import { Helmet } from 'react-helmet-async';

import { SuscripcionesView } from 'src/sections/misSuscripciones/view';

// ----------------------------------------------------------------------

export default function MySuscripciones() {
  return (
    <>
      <Helmet>
        <title> Mis Suscripciones  </title>
      </Helmet>

      <SuscripcionesView />
    </>
  );
}
