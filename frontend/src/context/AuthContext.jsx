import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://stockora-1.onrender.com';



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
        const response = await axios.get(`${backendUrl}/check-auth`);
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
      console.log('Attempting registration with:', { username, email, backendUrl });
      const response = await axios.post(`${backendUrl}/register`, {
        username,
        email,
        password
      });
      console.log('Registration successful:', response.data);
      
      // Set the current user immediately after successful registration
      setCurrentUser(response.data.user);
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Registration failed');
      throw error;
    }
  };

  // Login a user
  const login = async (username, password) => {
    try {
      setError('');
      console.log('Attempting login with:', { username, backendUrl });
      const response = await axios.post(`${backendUrl}/login`, {
        username,
        password
      });
      console.log('Login successful:', response.data);
      
      // Set the current user immediately after successful login
      setCurrentUser(response.data.user);
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    }
  };

  // Logout a user
  const logout = async () => {
    try {
      await axios.get(`${backendUrl}/logout`);
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
      {!loading && children}
    </AuthContext.Provider>
  );
};