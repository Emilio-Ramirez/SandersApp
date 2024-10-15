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
    title: 'Mis donaciones',
    path: '/user/donacion',
    icon: icon('ic_user'),
  },
  {
    title: 'Proyectos',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Donación Física',  // Nuevo elemento agregado
    path: '/admin/donacionFisica',  // Ruta hacia el componente de Donación Física
    icon: icon('ic_donation'), // Asegúrate de tener el ícono o usa uno temporal
  },
];

export default navConfig;
