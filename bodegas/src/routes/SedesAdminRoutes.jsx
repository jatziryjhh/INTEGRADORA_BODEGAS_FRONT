// src/routes/SedeAdminRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import BodegaGestion from "../components/AdminSede/sede/AgregarBodega";
import VistaBodega from "../components/AdminSede/sede/VistaBodegas";
import VistaCliente from "../components/AdminSede/sede/ListaClientes";
//import AgregarCliente from "../components/AdminSede/sede/AgregarCliente";
//import DashboardAdministrador from "../components/AdminSede/Dashboard";
import DashboardAdministrador from "../components/AdminSede/Dashboard";
const SedeAdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardAdministrador />} />
      <Route path="gestion" element={<BodegaGestion />} />
      <Route path="vistabodega" element={<VistaBodega />} />
      <Route path="vistacliente" element={<VistaCliente />} />
    </Routes>
  );
};

export default SedeAdminRoutes;
