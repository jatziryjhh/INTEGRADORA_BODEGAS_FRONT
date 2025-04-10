import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Rutas por rol
import SedeAdminRoutes from "./routes/SedesAdminRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Vistas públicas
import MainView from "./components/MainPage/MainView";
import LoginView from "./components/Login/LoginView";
import RegistrationView from "./components/Registration/RegistrationView";
import Password from "./components/Registration/Password";

// Contexto (si lo tienes)
//import { ColorProvider } from "./context/ColorContext";

// Estilos globales
import "./App.css";

// Simulación del rol actual (puedes cambiarlo según lógica real)
const userRole = "sede"; // "admin" o "sede"

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas públicas */}
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegistrationView />} />
        <Route path="/lost-password" element={<Password />} />

        {/* Rutas por rol */}
        {userRole === "admin" && (
          <Route path="/admin/*" element={<AdminRoutes />} />
        )}
        {userRole === "sede" && (
          <Route path="/sedes/*" element={<SedeAdminRoutes />} />
        )}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
