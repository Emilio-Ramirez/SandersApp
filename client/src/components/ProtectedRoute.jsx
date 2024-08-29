import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  console.log('ProtectedRoute - User:', user, 'Loading:', loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
