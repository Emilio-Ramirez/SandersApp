// src/layouts/userDashboard/config-navigation-user.jsx

import SvgColor from 'src/components/svg-color';

// Helper function to render icons
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// User navigation configuration
const userNavConfig = [
  {
    title: 'Dashboard',
    path: '/user/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Proyectos',
    path: '/user/projects',
    icon: icon('ic_blog'),
  },
  {
    title: 'Mis Donaciones',
    path: '/user/donacion',
    icon: icon('ic_cart'),
  },
  {
    title: 'Mis Suscripciones',
    path: '/user/suscripciones',
    icon: icon('ic_user'),
  },
];

export default userNavConfig;
