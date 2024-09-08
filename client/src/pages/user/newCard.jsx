
import { Helmet } from 'react-helmet-async';

import { NewCardsView } from 'src/sections/newCard/view';

// ----------------------------------------------------------------------

export default function NewCardsPage() {
  return (
    <>
      <Helmet>
        <title> Agregar Tarjetas  </title>
      </Helmet>

      <NewCardsView />
    </>
  );
}
