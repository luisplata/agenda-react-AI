import React from "react";

import { Link } from "react-router-dom";
const Sidebar: React.FC = () => {
  return (
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarLabel">Sidebar Title</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="d-grid gap-2">
          <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
          <Link to="/register" className="btn btn-secondary">Registrarse</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;