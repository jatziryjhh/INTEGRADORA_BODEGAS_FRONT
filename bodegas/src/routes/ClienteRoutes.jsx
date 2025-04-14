import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardCliente from "../components/Cliente/DashboardCliente";
import BodegasDisponibles from "../components/Cliente/BodegasDisponibles";


const ClienteRoutes = () => {
    return (
      <Routes>
        <Route path="dashboard" element={<DashboardCliente/>} />
        <Route path="disponibles" element={<BodegasDisponibles/> }/>
      </Routes>
    );
  };
  
  export default ClienteRoutes;