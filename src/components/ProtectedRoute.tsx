import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();

  if (!token) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the nested routes/component
  return <Outlet />;
};

export default ProtectedRoute;
