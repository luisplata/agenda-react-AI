import React from 'react';
import type { ReactNode } from 'react'; // Import ReactNode for typing children

interface DashboardLayoutProps {
  children?: ReactNode; // Define children prop
  sidebarOptions?: ReactNode; // Add sidebarOptions prop
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarOptions }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#212529', color: '#f8f9fa' }}> {/* Apply dark background and light text to main container */}
      {/* Left Sidebar (Options) */}
      <div style={{ width: '250px', backgroundColor: '#343a40', padding: '20px', color: '#f8f9fa' }}> {/* Apply darker background and light text to sidebar */}
        <h4 className="text-center">Options</h4> {/* Center the heading */}
        <div style={{ display: 'grid', gap: '10px' }}>{sidebarOptions}</div> {/* Render sidebarOptions here */}
      </div>

      {/* Right Content Area */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;