import React from "react";

import { useNavigate } from "react-router-dom";
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavLinkClick = (path: string) => {

    // Use a small delay to ensure the Offcanvas hide animation starts
    setTimeout(() => navigate(path), 300); // Adjust delay as needed
  };
  return (
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarLabel">Sidebar Title</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={() => handleNavLinkClick("/login")}>Iniciar sesión</button>
          <button className="btn btn-secondary" data-bs-dismiss="offcanvas" onClick={() => handleNavLinkClick("/register")}>Registrarse</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;