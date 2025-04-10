import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout";
import Dashboard from "../pages/Admin/DashboardPage";
import SedeForm from "../components/admin/sedes/SedeForm";
import UserAdminForm from "../components/admin/userAdmin/UserAdminForm";
import UserAdminPage from "../pages/Admin/UserAdminPage";
import SedePage from "../pages/Admin/SedePage";

const AdminRoutes = () => {
  const [administradores, setAdministradores] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Dashboard Global */}
        <Route path="" element={<Dashboard />} />
        {/* Gestión de Sedes */}
        <Route path="sedes" element={<SedePage />} />
        <Route path="sedes/new" element={<SedeForm />} />
        <Route path="sedes/edit/:id" element={<SedeForm />} />
        {/* Gestión de Administradores */}
        <Route
          path="administradores"
          element={
            <UserAdminPage
              administradores={administradores}
              setAdministradores={setAdministradores}
            />
          }
        />
        <Route path="administradores/new" element={<UserAdminForm />} />
        <Route path="administradores/edit/:id" element={<UserAdminForm />} />
        {/* Reportes y Notificaciones */}+
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
