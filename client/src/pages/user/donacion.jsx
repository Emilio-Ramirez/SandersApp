import { Helmet } from 'react-helmet-async';

import { DonacionView } from 'src/sections/misDonaciones/view';

// ----------------------------------------------------------------------

export default function DonacionPage() {
  return (
    <>
      <Helmet>
        <title> Mis Donaciones  </title>
      </Helmet>

      <DonacionView />
    </>
  );
}
