import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Configure axios to include credentials
  axios.defaults.withCredentials = true;

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3002/check-auth');
        if (response.data.isAuthenticated) {
          setCurrentUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Register a new user
  const register = async (username, email, password) => {
    try {
      setError('');
      const response = await axios.post('http://localhost:3002/register', {
        username,
        email,
        password
      });
      setCurrentUser(response.data.user);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
      throw error;
    }
  };

  // Login a user
  const login = async (username, password) => {
    try {
      setError('');
      const response = await axios.post('http://localhost:3002/login', {
        username,
        password
      });
      setCurrentUser(response.data.user);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    }
  };

  // Logout a user
  const logout = async () => {
    try {
      await axios.get('http://localhost:3002/logout');
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};