import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from './LoadingScreen';

const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingScreen message="Loading your dashboard..." />;
  }

  // Redirect to frontend login if not authenticated
  if (!currentUser) {
    // Redirect to the frontend login page
    window.location.href = `${frontendUrl}/login`;
    return <LoadingScreen message="Redirecting to login..." />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;
