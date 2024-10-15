import Iconify from 'src/components/iconify';

export const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <Iconify icon="eva:home-outline" />,
  },
  {
    title: 'Donaciones',
    path: '/admin/donaciones',
    icon: <Iconify icon="eva:gift-outline" />,
    children: [
      {
        title: 'Donaciones Físicas',
        path: '/admin/donaciones-fisicas',
      },
      {
        title: 'Nueva Donación',
        path: '/admin/new-donation',
      },
    ],
  },
];
