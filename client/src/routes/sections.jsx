import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import UserDashboardLayout from 'src/layouts/userDashboard';
import AdminDashboardLayout from 'src/layouts/adminDashboard';

import ProtectedRoute from '../components/ProtectedRoute';

// Landing Page
export const LandingPage = lazy(() => import('src/pages/LandingPage'));

// Admin Pages
export const AdminDashboardPage = lazy(() => import('src/pages/admin/dashboard'));
export const AdminUserPage = lazy(() => import('src/pages/admin/user'));
export const AdminProductsPage = lazy(() => import('src/pages/admin/products'));
export const AdminBlogPage = lazy(() => import('src/pages/admin/blog'));
export const AdminDonacionPage = lazy(() => import('src/pages/admin/donacion'));
export const AdminAddProjectPage = lazy(() => import('src/pages/admin/addProject'));
export const AdminProjectDescriptionPage = lazy(() => import('src/pages/admin/projectDescription'));

// User Pages
export const UserDashboardPage = lazy(() => import('src/pages/user/dashboard'));
export const UserProjectsPage = lazy(() => import('src/pages/user/projects'));
export const UserDonationPage = lazy(() => import('src/pages/user/donacion'));

// Common Pages
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const PayWithStripe = lazy(() => import('src/pages/payWithStripe'));
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
        { path: 'products', element: <AdminProductsPage /> },
        { path: 'blog', element: <AdminBlogPage /> },
        { path: 'new-project', element: <AdminAddProjectPage /> },
        { path: 'project/:id', element: <AdminProjectDescriptionPage /> },
        { path: 'donacion', element: <AdminDonacionPage /> },
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
      path: 'payWithStripe',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PayWithStripe />
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
