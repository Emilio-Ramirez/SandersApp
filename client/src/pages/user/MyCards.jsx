import { Helmet } from 'react-helmet-async';

import { MyCardsView } from 'src/sections/myCards/view';

// ----------------------------------------------------------------------

export default function MyCardsPage() {
  return (
    <>
      <Helmet>
        <title> Mis Tarjetas  </title>
      </Helmet>

      <MyCardsView />
    </>
  );
}
