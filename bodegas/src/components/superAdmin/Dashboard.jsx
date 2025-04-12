import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const DashboardAdministrador = () => {
  const navigate = useNavigate();
  const [bodegas, setBodegas] = useState([]);
  const [filtroEdificio, setFiltroEdificio] = useState("");
  const [filtroTamano, setFiltroTamano] = useState("");

  const obtenerBodegas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Sesión caducada", "Por favor inicia sesión nuevamente", "warning");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/bodegas/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBodegas(response.data);
    } catch (error) {
      console.error("Error al obtener las bodegas:", error);
    }
  };

  useEffect(() => {
    obtenerBodegas();
  }, []);

  const bodegasFiltradas = useMemo(() => {
    return bodegas.filter((b) => {
      const coincideEdificio = !filtroEdificio || b.edificio === filtroEdificio;
      const coincideTamano = !filtroTamano || b.tamano === filtroTamano;
      return coincideEdificio && coincideTamano;
    });
  }, [bodegas, filtroEdificio, filtroTamano]);

  const totalIngresos = bodegasFiltradas
    .filter((b) => b.estado === "RENTADA" && b.estatusPago === "DISPONIBLE")
    .reduce((acc, b) => acc + b.precio, 0);

  const ocupadas = bodegasFiltradas.filter((b) => b.estado === "RENTADA").length;
  const vacantes = bodegasFiltradas.filter((b) => b.estado === "DISPONIBLE").length;
  const porDesalojar = bodegasFiltradas.filter(
    (b) => b.estado === "POR VENCER" && b.estatusPago === "impago"
  );

  const clientesImpagos = useMemo(() => {
    return bodegasFiltradas.filter((b) => b.estatusPago === "impago");
  }, [bodegasFiltradas]);

  const notificarCliente = async (idBodega) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/bodegas/${idBodega}/`,
        { estatusPago: "pagado" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "info",
        title: "Notificación enviada",
        text: `Se ha notificado al cliente de la bodega ${idBodega}.`,
      });

      obtenerBodegas();
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 px-4 pb-8 w-full">
        {/* Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 mt-2">
          <div className="flex flex-wrap gap-4">
            <select
              className="p-3 rounded-lg border border-gray-300 bg-white font-semibold text-gray-700"
              value={filtroEdificio}
              onChange={(e) => setFiltroEdificio(e.target.value)}
            >
              <option value="">Todos los edificios</option>
              <option value="A">Edificio A</option>
              <option value="B">Edificio B</option>
              <option value="C">Edificio C</option>
            </select>

            <select
              className="p-3 rounded-lg border border-gray-300 bg-white font-semibold text-gray-700"
              value={filtroTamano}
              onChange={(e) => setFiltroTamano(e.target.value)}
            >
              <option value="">Todos los tamaños</option>
              <option value="chica">Chica</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricCard titulo="Ingresos Totales" valor={`$${totalIngresos}`} color="green" />
          <MetricCard titulo="Ocupadas" valor={ocupadas} color="blue" />
          <MetricCard titulo="Vacantes" valor={vacantes} color="yellow" />
        </div>

        {/* Bodegas por desalojar */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Bodegas por desalojar</h2>
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
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
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
                      Bodega {bodega.id} - Edificio {bodega.edificio} - Tamaño {bodega.tamano}
                    </p>
                    <p className="text-sm text-red-500">Precio: ${bodega.precio}</p>
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

        {/* Lista de todas las bodegas filtradas */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Listado de Bodegas</h2>
          {bodegasFiltradas.length > 0 ? (
            <ul className="space-y-3">
              {bodegasFiltradas.map((bodega) => (
                <li
                  key={bodega.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-lg bg-gray-50"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      Bodega #{bodega.id} - Edificio {bodega.edificio}
                    </p>
                    <p className="text-sm text-gray-600">
                      Tamaño: {bodega.tamano} | Estado: {bodega.estado} | Pago: {bodega.estatusPago}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cliente: {bodega.cliente?.nombre || "No registrado"} | Precio: ${bodega.precio}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay bodegas con los filtros aplicados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente reutilizable para mostrar métricas
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