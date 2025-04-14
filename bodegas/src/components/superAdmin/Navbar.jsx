// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <nav className="bg-orange-600 p-4 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/dashboard" className="text-white text-2xl font-semibold">
          Dashboard
        </Link>
        <div className="space-x-6 flex items-center">
          <Link
            to="/superadmin/dashboard"
            className="text-white hover:text-orange-200"
          >
            Dashboard
          </Link>
          <Link
            to="/superadmin/bodegas"
            className="text-white hover:text-orange-200"
          >
            Bodegas
          </Link>
          <Link
            to="/superadmin/clientes"
            className="text-white hover:text-orange-200"
          >
            Clientes
          </Link>
          <Link
            to="/superadmin/sedes"
            className="text-white hover:text-orange-200"
          >
            Sedes
          </Link>
          <Link
            to="/superadmin/usuarios"
            className="text-white hover:text-orange-200"
          >
            Administradores
          </Link>
          <Link
            to="/superadmin/bitacora"
            className="text-white hover:text-orange-200"
          >
            Bitacora
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-orange-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;