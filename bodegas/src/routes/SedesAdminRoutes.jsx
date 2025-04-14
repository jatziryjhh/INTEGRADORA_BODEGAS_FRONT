// src/routes/SedeAdminRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/AdminSede/Dashboard";
import AgregarBodega from "../components/AdminSede/sede/AgregarBodega";
import ListaClientes from "../components/AdminSede/sede/ListaClientes";
import ListaBodegas from "../components/AdminSede/sede/ListaBodegas";

const SedeAdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="gestion" element={<AgregarBodega />} />
      <Route path="clientes" element={<ListaClientes/>} />
      <Route path="bodegas" element={<ListaBodegas />} />
    </Routes>
  );
};

export default SedeAdminRoutes;
