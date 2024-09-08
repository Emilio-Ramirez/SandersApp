
import { Helmet } from 'react-helmet-async';

import { NewDonationView } from 'src/sections/newDonation/view';

// ----------------------------------------------------------------------

export default function NewDonationPage() {
  return (
    <>
      <Helmet>
        <title> Nueva Donación </title>
      </Helmet>

      <NewDonationView />
    </>
  );
}
