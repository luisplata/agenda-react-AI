import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout'; // Import DashboardLayout
import ModelProfileForm from '../components/ModelProfileForm';

const ModelDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <ModelProfileForm />
    </DashboardLayout>);
};

export default ModelDashboard;