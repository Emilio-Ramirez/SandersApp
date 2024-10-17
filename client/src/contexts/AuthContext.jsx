// scr/contexts/AuthContext.jsx
import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, useCallback, createContext } from 'react';

import api from '../utils/api'; // Make sure you've set up the api utility as mentioned in the previous response

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = useCallback(async (token) => {
    try {
      const response = await api.get('/api/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.valid) {
        const userData = {
          token,
          userId: response.data.userId,
          role: response.data.role
        };
        setUser(userData);
        setLoading(false);
        console.log('User data set:', userData);
        return userData;
      }
      throw new Error('Invalid token');
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      return null;
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await verifyToken(token);
        if (userData) {
          // Log the user data after the state has been updated
          console.log('User authenticated:', userData);
        } else {
          console.log('Authentication failed');
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [verifyToken]);

  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    verifyToken(token);
  }, [verifyToken]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  const loginAndRedirect = useCallback(async (loginData) => {
    const { token, userId, role } = loginData;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    const userData = { token, userId, role };
    setUser(userData);

    // Redirect based on role
    if (role === 'admin') {
      window.location.href = '/admin/';
    } else {
      window.location.href = '/user/';
    }
  }, []);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    loginAndRedirect,
    loading,
    isAdmin: user?.role === 'admin',
  }), [user, login, loginAndRedirect, logout, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
