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
    title: 'Proyectos',
    path: '/admin/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'users',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'donaciones',
    path: '/admin/donacion',
    icon: icon('ic_cart'),
  },
    {
    title: 'suscripciones',
    path: '/admin/suscripciones',
    icon: icon('ic_user'),
  },

];

export default navConfig;
