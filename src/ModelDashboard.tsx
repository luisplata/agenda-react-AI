import React from 'react';
import DashboardLayout from './layouts/DashboardLayout'; // Import DashboardLayout

const ModelDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <h2 className="text-center mb-4">Model Dashboard</h2>
      <p className="text-center">Welcome to the Model dashboard! Your specific content will go here.</p>
      {/* Add your model-specific content here */}
    </DashboardLayout>);
};

export default ModelDashboard;