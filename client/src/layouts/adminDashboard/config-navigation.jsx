import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'donaciones',
    path: '/admin/donacion',
    icon: icon('ic_user'),
  },
  {
    title: 'Donaciones Físicas',
    path: '/admin/donaciones-fisicas',
    icon: icon('ic_user'),
  },
  
  {
    title: 'Proyectos',
    path: '/admin/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
