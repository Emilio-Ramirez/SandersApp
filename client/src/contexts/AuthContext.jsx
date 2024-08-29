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
        setUser({ token, userId: response.data.userId });
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('AuthProvider - Token:', token);
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, [verifyToken]);

  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    verifyToken(token);
  }, [verifyToken]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const loginAndRedirect = useCallback(async (token, redirectTo) => {
    localStorage.setItem('token', token);
    await verifyToken(token); // Wait for token verification
    if (redirectTo) {
      window.location.href = redirectTo; // Use window.location for a full page reload
    }
  }, [verifyToken]);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    loginAndRedirect,
    loading,
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
