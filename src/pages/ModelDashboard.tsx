import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ModelProfileForm from '../components/ModelProfileForm';
import ModelAdditionalDataForm from '../components/ModelAdditionalDataForm';
import { useAuth } from '../context/AuthContext';

const ModelDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false); // State to control authentication process
  const [activeOption, setActiveOption] = useState<'profile' | 'additionalData'>('profile'); // State to control which option is active

  const handleAuthenticationError = () => {
    logout();
    setIsAuthenticating(true); // Set authenticating state to true
    navigate('/', { state: { message: 'Su session ya caduco' } });
  };

  const sidebarOptions = (
    <div>
      <button onClick={() => setActiveOption('profile')}>Profile</button>
      <button onClick={() => setActiveOption('additionalData')}>Additional Data</button>
    </div>
  );

  return (
    <DashboardLayout sidebarOptions={sidebarOptions}>
      {isAuthenticating ? (
        <p>Redirecting to login...</p> // Loading indicator or message while redirecting
      ) : (
        <>
          <h2>Model Dashboard</h2>
          <div>
            {/* Render the active option */}
            {activeOption === 'profile' && (
              <ModelProfileForm onAuthenticationError={handleAuthenticationError} />
            )}
            {activeOption === 'additionalData' && (
              <ModelAdditionalDataForm /> // Render the new component
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default ModelDashboard;