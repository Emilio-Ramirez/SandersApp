import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/user',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/user/',
    icon: icon('ic_user'),
  },
  {
    title: 'mis donaciones',
    path: '/user/donacion',
    icon: icon('ic_user'),
  },

  {
    title: 'Proyectos',
    path: '/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
