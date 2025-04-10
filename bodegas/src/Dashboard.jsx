import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [ingresos, setIngresos] = useState(0); // Para los ingresos de la sede o global
  const [bodegas, setBodegas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga

  useEffect(() => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid'); // Suponiendo que has guardado el UUID en localStorage

    if (!token || !uuid) {
      navigate('/'); // Redirigir si no hay token o UUID (no está autenticado)
      return;
    }

    // Obtener los datos del usuario desde el backend
    fetch(`http://localhost:8080/api/usuarios/uuid/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos del usuario');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        
        // Ajustar la lógica dependiendo del rol del usuario
        if (data.rol === 'SUPER_ADMIN') {
          setIngresos(10000);  // Ejemplo: Puedes poner los ingresos globales
        } else if (data.rol === 'ADMIN') {
          setBodegas([
            { folio: 'B01', tamaño: 'Grande', estado: 'Ocupada' },
            { folio: 'B02', tamaño: 'Mediana', estado: 'Disponible' },
          ]);
          setClientes([
            { id: 1, nombre: 'Juan Pérez', estadoPago: 'Pendiente' },
            { id: 2, nombre: 'Maria López', estadoPago: 'Pagado' },
          ]);
          setIngresos(5000); // Ejemplo: Los ingresos de la sede o administrador
        } else if (data.rol === 'CLIENT') {
          setBodegas([
            { folio: 'B03', tamaño: 'Pequeña', vencimiento: '2025-05-10' },
          ]);
        }

        setLoading(false);  // Finalizar la carga
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <p>Cargando...</p>; // Mostrar mensaje de carga mientras se obtiene el usuario
  }

  if (!userData) {
    return <p>Error al obtener los datos del usuario.</p>; // Si no se obtuvo datos, mostrar un error
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="overview">
        <h3>Bienvenido, {userData.nombre}</h3>
        <p>Rol: {userData.rol}</p>
      </div>

      {userData.rol === 'SUPER_ADMIN' && (
        <div className="superadmin-section">
          <h3>Resumen Global</h3>
          <p>Ingresos Totales: ${ingresos}</p>
          {/* Aquí puedes agregar más detalles del superadmin */}
        </div>
      )}

      {userData.rol === 'ADMIN' && (
        <div className="admin-section">
          <h3>Resumen Sede</h3>
          <p>Ingresos de la sede: ${ingresos}</p>
          <h4>Bodegas</h4>
          <ul>
            {bodegas.map(bodega => (
              <li key={bodega.folio}>
                {bodega.folio} - {bodega.tamaño} - {bodega.estado}
              </li>
            ))}
          </ul>
          <h4>Clientes Pendientes de Pago</h4>
          <ul>
            {clientes.map(cliente => (
              <li key={cliente.id}>
                {cliente.nombre} - Estado de Pago: {cliente.estadoPago}
              </li>
            ))}
          </ul>
        </div>
      )}

      {userData.rol === 'CLIENT' && (
        <div className="client-section">
          <h3>Mis Bodegas Rentadas</h3>
          <ul>
            {bodegas.map(bodega => (
              <li key={bodega.folio}>
                {bodega.folio} - {bodega.tamaño} - Vence el: {bodega.vencimiento}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;