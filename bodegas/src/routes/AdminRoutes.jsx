import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/superAdmin/Dashboard";
import SedeGestion from "../components/superAdmin/SedesGestion";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="sedes/gestion" element={<SedeGestion />} />
    </Routes>
  );
};

export default AdminRoutes;
