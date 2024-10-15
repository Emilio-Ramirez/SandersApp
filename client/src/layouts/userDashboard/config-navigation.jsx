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
<<<<<<< HEAD
  // {
  //   title: 'users',
  //   path: '/user/',
  //   icon: icon('ic_user'),
  // },
=======
  {
    title: 'Proyectos',
    path: '/user/projects',
    icon: icon('ic_blog'),
  },
>>>>>>> main
  {
    title: 'mis donaciones',
    path: '/user/donacion',
    icon: icon('ic_cart'),
  },
  {
    title: 'mis suscripciones',
    path: '/user/suscripciones',
    icon: icon('ic_user'),
  },
];

export default navConfig;
