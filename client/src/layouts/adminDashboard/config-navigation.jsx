// src/layouts/adminDashboard/config-navigation.jsx

import SvgColor from 'src/components/svg-color';

// Helper function to render icons
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Admin Navigation Configuration
const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',  // ACTUALIZADO: Ruta al Dashboard
    icon: icon('ic_analytics'), // Icono para el Dashboard
  },
  {
    title: 'Proyectos',
    path: '/admin/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Usuarios',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Donaciones',
    path: '/admin/donacion',
    icon: icon('ic_cart'),
  },
  {
    title: 'Donaciones Físicas',
    path: '/admin/physical-donations', // ACTUALIZADO: Ruta correcta para Donaciones Físicas
    icon: icon('ic_cart'),
  },
  {
    title: 'Suscripciones',
    path: '/admin/suscripciones',
    icon: icon('ic_user'),
  },
];

export default navConfig;
