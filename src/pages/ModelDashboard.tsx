import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout'; // Import DashboardLayout
import ModelProfileForm from '../components/ModelProfileForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useState } from 'react';

const ModelDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // State to control form visibility, might be redundant if controlled by isAuthenticating
  const [showProfileForm, setShowProfileForm] = useState(true);

  const { logout } = useAuth(); // Use useAuth to get the logout function

  const handleAuthenticationError = () => {
    logout();
    setIsAuthenticating(true); // Set authenticating state to true
    setShowProfileForm(false);
    navigate('/', { state: { message: 'Su session ya caduco' } });
  };

  return (
    <DashboardLayout>
      {isAuthenticating ? (
        <p>Redirecting to login...</p> // Loading indicator or message while redirecting
      ) : (
        <>
          <h2>Model Dashboard</h2>
          {showProfileForm && (
            <ModelProfileForm onAuthenticationError={handleAuthenticationError} />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default ModelDashboard;