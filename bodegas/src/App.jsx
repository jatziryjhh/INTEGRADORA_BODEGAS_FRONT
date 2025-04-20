import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Importar rutas para cada rol
import AdminRoutes from "./routes/AdminRoutes";
import SedesAdminRoutes from "./routes/SedesAdminRoutes";
import ClienteRoutes from "./routes/ClienteRoutes";
// Vistas públicas
import MainView from "./components/MainPage/MainView";
import ResetPassword from "./components/Registration/ResetPassword";
import LoginView from "./components/Login/LoginView";
import RegistrationView from "./components/Registration/RegistrationView";
import Password from "./components/Registration/Password";

import "./App.css";

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegistrationView />} />
          <Route path="/lost-password" element={<Password />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Rutas privadas según el rol */}
          <Route path="/superadmin/*" element={<AdminRoutes />} />
          <Route path="/admin/*" element={<SedesAdminRoutes />} />
          <Route path="/cliente/*" element={<ClienteRoutes />} /> 
                 
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
