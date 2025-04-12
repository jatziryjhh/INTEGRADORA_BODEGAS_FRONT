import { useEffect, useState } from "react";
import axios from "axios";
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
        setEntradas(response.data);
      } catch (err) {
        console.error("Error al obtener la bitácora:", err);
        setError("No se pudo cargar la bitácora.");
      } finally {
        setLoading(false);
      }
    };

    obtenerBitacora();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <main className="pt-24 px-6 md:px-12">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Bitácora del Sistema</h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando registros...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left border-b border-gray-300">
                  <th className="py-2 px-4">Usuario</th>
                  <th className="py-2 px-4">Rol</th>
                  <th className="py-2 px-4">Nombre</th>
                  <th className="py-2 px-4">Método</th>
                  <th className="py-2 px-4">Ruta</th>
                  <th className="py-2 px-4">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody>
                {entradas.map((e, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 text-sm">
                    <td className="py-2 px-4">{e.usuarioId}</td>
                    <td className="py-2 px-4">{e.rol}</td>
                    <td className="py-2 px-4">{e.nombre}</td>
                    <td className="py-2 px-4">{e.metodo}</td>
                    <td className="py-2 px-4">{e.ruta}</td>
                    <td className="py-2 px-4">{new Date(e.fechaHora).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {entradas.length === 0 && (
              <p className="text-center py-4 text-gray-500">No hay registros en la bitácora.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bitacora;