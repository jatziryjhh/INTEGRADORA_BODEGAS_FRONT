import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login'; // Componente de login existente
import Dashboard from './components/admin/DashboardSuperAdmin'; // Dashboard principal
import AdministradoresScreen from './components/admin/AdministradoresScreen'; // Pantalla de administradores
import SedesScreen from './components/admin/SedesScreen'; // Pantalla de sedes
import 'bootstrap/dist/css/bootstrap.min.css';

// Componente para rutas protegidas que verifica el rol
const ProtectedRoute = ({ element }) => {
  // En un caso real, obtener el usuario y su rol desde localStorage o tu sistema de autenticación
  const user = JSON.parse(localStorage.getItem('user')) || { role: 'superadmin' }; // Por defecto para pruebas
  
  // Verificar si el usuario está autenticado y es superadmin
  const isAuthenticated = !!localStorage.getItem('token');
  const isSuperAdmin = user.role === 'superadmin';
  
  // Si está autenticado y es superadmin, mostrar el elemento
  // Si no, redirigir al login
  return isAuthenticated && isSuperAdmin ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas para superadmin */}
        <Route 
          path="/" 
          element={<ProtectedRoute element={<Dashboard />} />} 
        />
        <Route 
          path="/administradores" 
          element={<ProtectedRoute element={<AdministradoresScreen />} />} 
        />
        <Route 
          path="/sedes" 
          element={<ProtectedRoute element={<SedesScreen />} />} 
        />
        
        {/* Ruta por defecto - redirige al dashboard si está logueado */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;