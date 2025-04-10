import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

// Componente principal del Dashboard
const DashboardAdministrador = () => {
  const [bodegas, setBodegas] = useState([]);
  const [filtroEdificio, setFiltroEdificio] = useState("");
  const [filtroTamano, setFiltroTamano] = useState("");

  // Llamada a la API para obtener las bodegas
  useEffect(() => {
    const obtenerBodegas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bodega/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBodegas(response.data);
      } catch (error) {
        console.error("Error al obtener las bodegas:", error);
      }
    };
    obtenerBodegas();
  }, []);

  // Filtrar bodegas según los filtros seleccionados
  const bodegasFiltradas = useMemo(() => {
    return bodegas.filter((b) => {
      const coincideEdificio = !filtroEdificio || b.edificio === filtroEdificio;
      const coincideTamano = !filtroTamano || b.tamano === filtroTamano;
      return coincideEdificio && coincideTamano;
    });
  }, [bodegas, filtroEdificio, filtroTamano]);

  // Calcular ingresos totales de las bodegas ocupadas y pagadas
  const totalIngresos = bodegasFiltradas
    .filter((b) => b.estado === "ocupada" && b.estatusPago === "pagado")
    .reduce((acc, b) => acc + b.precio, 0);

  // Contar las bodegas ocupadas y vacantes
  const ocupadas = bodegasFiltradas.filter((b) => b.estado === "ocupada").length;
  const vacantes = bodegasFiltradas.filter((b) => b.estado === "vacante").length;

  // Filtrar bodegas por desalojar
  const porDesalojar = bodegasFiltradas.filter(
    (b) => b.estado === "ocupada" && b.estatusPago === "impago"
  );

  // Filtrar clientes con pagos pendientes
  const clientesImpagos = useMemo(() => {
    return bodegasFiltradas.filter((b) => b.estatusPago === "impago");
  }, [bodegasFiltradas]);

  // Función para notificar al cliente sobre su pago pendiente
  const notificarCliente = async (idBodega) => {
    try {
      await axios.put(
        `http://localhost:8080/api/bodegas/${idBodega}`,
        {
          estatusPago: "pagado", // Actualizamos el estatus de pago
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "info",
        title: `Notificación enviada`,
        text: `Se ha notificado al cliente de la bodega ${idBodega}.`,
      });
    } catch (error) {
      console.error("Error al notificar al cliente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo notificar al cliente.",
      });
    }
  };

  return (
    <div className="p-8 w-full min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Dashboard del Administrador
      </h1>

      {/* Filtros */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <select
            className="p-3 rounded-lg border border-gray-300 bg-white font-semibold text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            value={filtroEdificio}
            onChange={(e) => setFiltroEdificio(e.target.value)}
          >
            <option value="">Todos los edificios</option>
            <option value="A">Edificio A</option>
            <option value="B">Edificio B</option>
            <option value="C">Edificio C</option>
          </select>
          <select
            className="p-3 rounded-lg border border-gray-300 bg-white font-semibold text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            value={filtroTamano}
            onChange={(e) => setFiltroTamano(e.target.value)}
          >
            <option value="">Todos los tamaños</option>
            <option value="chica">Chica</option>
            <option value="mediana">Mediana</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        {/* Botones de Navegación */}
        <div className="flex gap-4">
          <Link to="/sedes/vistabodega">
            <button className="flex items-center justify-center p-3 bg-orange-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Lista de Bodegas
            </button>
          </Link>

          <Link to="/sedes/vistacliente">
            <button className="flex items-center justify-center p-3 bg-orange-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Lista de Clientes
            </button>
          </Link>

          {/* Botón para Gestión de Sedes */}
          <Link to="/superadmin/sedes/gestion">
            <button className="flex items-center justify-center p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300">
              Gestión de Sedes
            </button>
          </Link>

          {/* Botón para Gestión de Administradores */}
          <Link to="/gestion-administradores">
            <button className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Gestión de Administradores
            </button>
          </Link>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard
          titulo="Ingresos Totales"
          valor={`$${totalIngresos}`}
          color="green"
        />
        <MetricCard titulo="Ocupadas" valor={ocupadas} color="blue" />
        <MetricCard titulo="Vacantes" valor={vacantes} color="yellow" />
      </div>

      {/* Bodegas por desalojar */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Bodegas por desalojar
        </h2>
        {porDesalojar.length > 0 ? (
          <ul className="space-y-3">
            {porDesalojar.map((bodega) => (
              <li
                key={bodega.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-semibold">Folio: {bodega.id}</p>
                  <p className="text-sm text-gray-600">
                    Edificio {bodega.edificio} - Tamaño {bodega.tamano}
                  </p>
                </div>
                <button
                  className="mt-2 sm:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => notificarCliente(bodega.id)}
                >
                  Notificar al cliente
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay bodegas por desalojar.</p>
        )}
      </div>

      {/* Clientes que faltan por pagar */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">
          Clientes que faltan por pagar
        </h2>
        {clientesImpagos.length > 0 ? (
          <ul className="space-y-3">
            {clientesImpagos.map((bodega) => (
              <li
                key={bodega.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-semibold">Cliente: {bodega.cliente}</p>
                  <p className="text-sm text-gray-600">
                    Bodega {bodega.id} - Edificio {bodega.edificio} - Tamaño{" "}
                    {bodega.tamano}
                  </p>
                  <p className="text-sm text-red-500">
                    Precio: ${bodega.precio}
                  </p>
                </div>
                <button
                  className="mt-2 sm:mt-0 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => notificarCliente(bodega.id)}
                >
                  Notificar al cliente
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Todos los clientes están al día con sus pagos.
          </p>
        )}
      </div>
    </div>
  );
};

// Componente para mostrar métricas
const MetricCard = ({ titulo, valor, color }) => {
  const colorClass =
    {
      green: "text-green-600",
      blue: "text-blue-600",
      yellow: "text-yellow-500",
    }[color] || "text-gray-800";

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700">{titulo}</h2>
      <p className={`text-2xl font-bold ${colorClass}`}>{valor}</p>
    </div>
  );
};

export default DashboardAdministrador;