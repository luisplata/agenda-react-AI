import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have a useAuth hook

const ProtectedRoute: React.FC = () => {
  const { token, logout } = useAuth(); // Get authentication state and logout function

  useEffect(() => {
    // If a token exists, perform a validation check
    if (token) {
      const isTokenValid = true;
      if (!isTokenValid) {
        logout();
      }
    }
  }, [token, logout]); // Re-run effect if token or logout changes

  if (!token) {
    logout();
    return <Navigate to="/" state={{ message: 'Please log in to access this page.' }} replace />;
  }

  // If authenticated, render the child routes/component
  return <Outlet />;
};

export default ProtectedRoute;
