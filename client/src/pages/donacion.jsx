import { Helmet } from 'react-helmet-async';

import { DonacionView } from 'src/sections/donacion/view';

// ----------------------------------------------------------------------

export default function DonacionPage() {
  return (
    <>
      <Helmet>
        <title> Donaciones | Minimal UI </title>
      </Helmet>

      <DonacionView />
    </>
  );
}
