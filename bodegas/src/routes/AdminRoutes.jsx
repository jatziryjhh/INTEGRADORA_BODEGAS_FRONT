import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/superAdmin/Dashboard";
import SedeGestion from "../components/superAdmin/SedesGestion";
import AdministradorGestion from "../components/superAdmin/AdminitradorGestion";
import ListaBodegas from "../components/superAdmin/ListaBodegas";
import ListaClientes from "../components/superAdmin/ListaClientes";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="sedes" element={<SedeGestion />} />
      <Route path="usuarios" element={<AdministradorGestion />} />
      <Route path="bodegas" element={<ListaBodegas />} />
      <Route path="clientes" element={<ListaClientes />} />
    </Routes>
  );
};

export default AdminRoutes;
