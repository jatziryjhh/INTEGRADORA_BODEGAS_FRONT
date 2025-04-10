import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login'; // Asegúrate de tener este componente
import Home from './Home';   // Otro componente que quieras usar
import Dashboard from './Dashboard';  // Ejemplo de otro componente
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener bootstrap

function App() {
  return (
    <Router>
      <div className="App">
        {/* Rutas definidas aquí */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
