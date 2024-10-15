import IconBlog from '@mui/icons-material/Article';
import IconUsers from '@mui/icons-material/People';
import IconProject from '@mui/icons-material/FolderOpen';
import IconDashboard from '@mui/icons-material/Dashboard';
import IconDonation from '@mui/icons-material/VolunteerActivism';
import IconDonationFisica from '@mui/icons-material/AccountBalance';




const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: <IconDashboard />,  // Dashboard icon
  },
  {
    title: 'Users',
    path: '/admin/user',
    icon: <IconUsers />,  // Users icon
  },
  {
    title: 'Blog',
    path: '/admin/blog',
    icon: <IconBlog />,  // Blog icon
  },
  {
    title: 'New Project',
    path: '/admin/new-project',
    icon: <IconProject />,  // New Project icon
  },
  {
    title: 'Donación',
    path: '/admin/donacion',
    icon: <IconDonation />,  // General Donation icon
  },
  {
    title: 'Donación Física',
    path: '/admin/donacion-fisica',  // This is the route for the Donación Física admin section
    icon: <IconDonationFisica />,    // Icon for Donación Física
  },
];

export default navConfig;
