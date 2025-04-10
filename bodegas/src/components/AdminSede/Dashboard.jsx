import { useState, useMemo } from "react";
import Swal from "sweetalert2";

// Simulación de datos (puedes sustituirlo por datos reales desde API)
const bodegasSimuladas = [
  { id: "B1", estado: "ocupada", estatusPago: "pagado", precio: 1500, edificio: "A", tamano: "chica", cliente: "Cliente A" },
  { id: "B2", estado: "vacante", estatusPago: "pagado", precio: 0, edificio: "B", tamano: "mediana", cliente: "Cliente B" },
  { id: "B3", estado: "ocupada", estatusPago: "impago", precio: 1800, edificio: "C", tamano: "grande", cliente: "Cliente C" },
  { id: "B4", estado: "ocupada", estatusPago: "pagado", precio: 2200, edificio: "A", tamano: "mediana", cliente: "Cliente D" },
  { id: "B5", estado: "ocupada", estatusPago: "impago", precio: 2100, edificio: "B", tamano: "chica", cliente: "Cliente E" },
];

const DashboardAdministrador = () => {
  const [bodegas] = useState(bodegasSimuladas);
  const [filtroEdificio, setFiltroEdificio] = useState("");
  const [filtroTamano, setFiltroTamano] = useState("");

  const bodegasFiltradas = useMemo(() => {
    return bodegas.filter((b) => {
      const coincideEdificio = !filtroEdificio || b.edificio === filtroEdificio;
      const coincideTamano = !filtroTamano || b.tamano === filtroTamano;
      return coincideEdificio && coincideTamano;
    });
  }, [bodegas, filtroEdificio, filtroTamano]);

  const totalIngresos = bodegasFiltradas
    .filter((b) => b.estado === "ocupada" && b.estatusPago === "pagado")
    .reduce((acc, b) => acc + b.precio, 0);

  const ocupadas = bodegasFiltradas.filter((b) => b.estado === "ocupada").length;
  const vacantes = bodegasFiltradas.filter((b) => b.estado === "vacante").length;
  const porDesalojar = bodegasFiltradas.filter(
    (b) => b.estado === "ocupada" && b.estatusPago === "impago"
  );

  const clientesImpagos = useMemo(() => {
    return bodegasFiltradas.filter((b) => b.estatusPago === "impago");
  }, [bodegasFiltradas]);

  const notificarCliente = (idBodega) => {
    Swal.fire({
      icon: "info",
      title: `Notificación enviada`,
      text: `Se ha notificado al cliente de la bodega ${idBodega}.`,
    });
  };

  return (
    <div className="p-8 w-full min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Dashboard del Administrador
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <select
          className="p-3 rounded-lg border border-gray-300"
          value={filtroEdificio}
          onChange={(e) => setFiltroEdificio(e.target.value)}
        >
          <option value="">Todos los edificios</option>
          <option value="A">Edificio A</option>
          <option value="B">Edificio B</option>
          <option value="C">Edificio C</option>
        </select>
        <select
          className="p-3 rounded-lg border border-gray-300"
          value={filtroTamano}
          onChange={(e) => setFiltroTamano(e.target.value)}
        >
          <option value="">Todos los tamaños</option>
          <option value="chica">Chica</option>
          <option value="mediana">Mediana</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard titulo="Ingresos Totales" valor={`$${totalIngresos}`} color="green" />
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

      {/* Clientes por pagar */}
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
          <p className="text-gray-500">Todos los clientes están al día con sus pagos.</p>
        )}
      </div>
    </div>
  );
};

// Componente reutilizable para métricas
const MetricCard = ({ titulo, valor, color }) => {
  const colorClass = {
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