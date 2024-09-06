// src/components/AdminProtectedRoute.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const AdminProtectedRoute = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;  
