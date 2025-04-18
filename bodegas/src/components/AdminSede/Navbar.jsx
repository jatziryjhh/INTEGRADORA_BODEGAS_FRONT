import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Box, User, PlusSquare, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("id");
    localStorage.removeItem("status");
    navigate("/login");
  };

  return (
    <nav className="bg-orange-600 p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center container mx-auto">
        <div
          className="text-white text-2xl font-semibold cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </div>
        <div className="space-x-6 flex items-center">
          <Link
            to="/admin/dashboard"
            className="text-white flex items-center hover:text-orange-200"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/bodegas"
            className="text-white flex items-center hover:text-orange-200"
          >
            Ver Bodegas
          </Link>

          <Link
            to="/admin/gestion"
            className="text-white flex items-center hover:text-orange-200"
          >
            Agregar Bodega
          </Link>

          <Link
            to="/admin/clientes"
            className="text-white flex items-center hover:text-orange-200"
          >
            Clientes
          </Link>

          <button
            onClick={handleLogout}
            className="text-white flex items-center hover:text-orange-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;