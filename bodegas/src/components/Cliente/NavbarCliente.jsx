import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarCliente = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("id");
    
    navigate("/login");
  };

  return (
    <nav className="bg-orange-600 p-4 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/cliente/dashboard" className="text-white text-2xl font-semibold">
          Dashboard
        </Link>
        <div className="space-x-6">
          <Link to="/cliente/dashboard" className="text-white hover:text-orange-200">
            Mis Bodegas
          </Link>
          <Link to="/cliente/disponibles" className="text-white hover:text-orange-200">
            Bodegas Disponibles
          </Link>
          <button
            onClick={handleLogout} className="text-white hover:text-orange-200">Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCliente;
