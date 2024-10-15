import { Helmet } from 'react-helmet-async';

import { ProyectView } from 'src/sections/proyectUser/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Proyectos | Minimal UI </title>
      </Helmet>

      <ProyectView />
    </>
  );
}
