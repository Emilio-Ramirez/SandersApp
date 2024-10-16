
import { Helmet } from 'react-helmet-async';

import { SuscripcionesView } from 'src/sections/suscripciones/view';

// ----------------------------------------------------------------------

export default function SuscripcionesPage() {
  return (
    <>
      <Helmet>
        <title> Suscripciones  </title>
      </Helmet>

      <SuscripcionesView />
    </>
  );
}
