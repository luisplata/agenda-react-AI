import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout'; // Import DashboardLayout

const AssistDashboard: React.FC = () => {
  return (
    <DashboardLayout> {/* Wrap with DashboardLayout */}
      <h2>Assist Dashboard</h2>
      <p>This is the dashboard for users with the Assist profile.</p>
      {/* Add assist-specific dashboard content here */}
    </DashboardLayout>
  );
};

export default AssistDashboard;