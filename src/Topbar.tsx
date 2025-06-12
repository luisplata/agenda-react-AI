import React from 'react';
import { Link } from 'react-router-dom';

const Topbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo Placeholder */}
        <Link className="navbar-brand" to="/">
          {/* Replace with your logo image and adjust dimensions as needed */}
          <img src="https://lobasvip.com.ve/image.jpg" alt="Logo" height="100" className="d-inline-block align-text-top" style={{ objectFit: 'contain' }} />
        </Link>

        {/* Toggler Button for Sidebar (will need sidebar implementation) */}
        <button className="btn btn-outline-light ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Topbar;