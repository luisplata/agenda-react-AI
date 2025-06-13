import React from 'react';
import DashboardLayout from './layouts/DashboardLayout'; // Import DashboardLayout

const AdminDashboard: React.FC = () => {
  // Define sidebar options specifically for the Admin Dashboard
  const adminSidebarOptions = (
    <div style={{ display: 'grid', gap: '10px' }}>
      {/* Replace with actual admin options (buttons or links) */}
      <button className="btn btn-secondary">Manage Users</button>
      <button className="btn btn-secondary">View Reports</button>
      <button className="btn btn-secondary">Settings</button>
      {/* Add more admin options here */}
    </div>
  );

  return (
    <DashboardLayout sidebarOptions={adminSidebarOptions}> {/* Pass admin options to DashboardLayout */}
      <div className="container mt-5"> {/* Keep container for main content padding */}
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. This is where admin-specific content and functionality will be placed.</p>
        {/* Add more admin-specific content here */}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;