// src/pages/DonarPage.jsx
import { Helmet } from 'react-helmet-async';

import { DonarView } from 'src/sections/donar/view';

export default function DonarPage() {
  return (
    <>
      <Helmet>
        <title>Donación | SandersApp</title>
      </Helmet>
      <DonarView />
    </>
  );
}
