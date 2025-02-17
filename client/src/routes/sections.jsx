import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserDashboardLayout from 'src/layouts/userDashboard';
import AdminDashboardLayout from 'src/layouts/adminDashboard';

import UserList from 'src/components/UserList'; // Importar el componente de usuarios

import ProtectedRoute from '../components/ProtectedRoute';

// Landing Page
export const LandingPage = lazy(() => import('src/pages/LandingPage'));

// Admin Pages
export const AdminDashboardPage = lazy(() => import('src/pages/admin/dashboard'));
export const AdminUserPage = lazy(() => import('src/pages/admin/user'));
export const AdminBlogPage = lazy(() => import('src/pages/admin/blog'));
export const AdminDonacionPage = lazy(() => import('src/pages/admin/donacion'));
export const AdminAddProjectPage = lazy(() => import('src/pages/admin/addProject'));
export const AdminProjectDescriptionPage = lazy(() => import('src/pages/admin/projectDescription'));
export const AdminSuscripciones = lazy(() => import('src/pages/admin/Suscripciones'));

// User Pages
export const UserDashboardPage = lazy(() => import('src/pages/user/dashboard'));
export const UserProjectsPage = lazy(() => import('src/pages/user/projects'));
export const UserDonationPage = lazy(() => import('src/pages/user/donacion'));
export const UserNewDonation = lazy(() => import('src/pages/user/newDonation'));
export const UserMyCards = lazy(() => import('src/pages/user/MyCards'));
export const UserNewCards = lazy(() => import('src/pages/user/newCard'));
export const UserMySuscripciones = lazy(() => import('src/pages/user/mySuscripciones'));

// Common Pages
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const DonarPage = lazy(() => import('src/pages/donar'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UnauthorizedPage = lazy(() => import('src/pages/Unauthorized'));

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPage />
        </Suspense>
      ),
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </AdminDashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <AdminDashboardPage />, index: true },
        { path: 'user', element: <AdminUserPage /> },
        { path: 'blog', element: <AdminBlogPage /> },
        { path: 'new-project', element: <AdminAddProjectPage /> },
        { path: 'project/:id', element: <AdminProjectDescriptionPage /> },
        { path: 'donacion', element: <AdminDonacionPage /> },
        { path: 'users', element: <UserList /> },
        { path: 'suscripciones', element: <AdminSuscripciones /> },
      ],
    },
    {
      path: '/user',
      element: (
        <ProtectedRoute allowedRoles={['user', 'admin']}>
          <UserDashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </UserDashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <UserDashboardPage />, index: true },
        { path: 'projects', element: <UserProjectsPage /> },
        { path: 'donacion', element: <UserDonationPage /> },
        { path: 'suscripciones', element: <UserMySuscripciones /> },
        { path: 'new-donation', element: <UserNewDonation /> },
        { path: 'my-cards', element: <UserMyCards /> },
        { path: 'new-card', element: <UserNewCards /> },
        { path: 'project/:id', element: <AdminProjectDescriptionPage /> },
      ],
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterPage />
        </Suspense>
      ),
    },
    {
      path: 'donar',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <DonarPage />
        </Suspense >
      ),
    },
    {
      path: 'unauthorized',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <UnauthorizedPage />
        </Suspense>
      ),
    },
    {
      path: '404',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Page404 />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
