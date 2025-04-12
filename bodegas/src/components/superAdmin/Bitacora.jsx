import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Navbar from "./Navbar";

const Bitacora = () => {
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerBitacora = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/bitacora/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ordenar los registros por fecha descendente (más recientes primero)
        const ordenado = response.data.sort(
          (a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)
        );

        setEntradas(ordenado);
      } catch (err) {
        console.error("Error al obtener la bitácora:", err);
        setError("No se pudo cargar la bitácora.");
      } finally {
        setLoading(false);
      }
    };

    obtenerBitacora();
  }, []);

  // Columnas para DataTable
  const columnas = [
    {
      name: "Usuario",
      selector: (row) => row.usuarioId,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Método",
      selector: (row) => row.metodo,
    },
    {
      name: "Ruta",
      selector: (row) => row.ruta,
      wrap: true,
    },
    {
      name: "Fecha y Hora",
      selector: (row) => new Date(row.fechaHora).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <main className="pt-24 px-6 md:px-12">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Bitácora del Sistema
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando registros...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-4">
            <DataTable
              columns={columnas}
              data={entradas}
              pagination
              highlightOnHover
              striped
              responsive
              dense
              noDataComponent="No hay registros en la bitácora."
              defaultSortFieldId={6} // Fecha y Hora
              defaultSortAsc={false} // Descendente
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Bitacora;
