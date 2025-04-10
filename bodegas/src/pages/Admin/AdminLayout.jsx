import React from "react";
import { Outlet } from "react-router-dom"; // Esto es necesario para renderizar el contenido dinámico
import Sidebar from "../../components/admin/Sidebar"; // Sidebar de administración
import Navbar from "../../components/admin/Navbar";  // Navbar de administración

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Sidebar visible solo cuando estamos en una ruta de /admin */}
    
      <Sidebar /> {/* Sidebar de administración */}
      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar visible solo dentro del panel admin */}
        <Navbar />
        
        {/* Contenido dinámico */}
        <main className="flex-1 p-6">
          <Outlet /> {/* Este es el lugar donde se renderizarán las rutas internas */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
