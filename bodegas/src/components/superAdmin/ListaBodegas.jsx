import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./Navbar"; // Asegúrate de que la ruta sea correcta

const ListaBodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [disponibles, setDisponibles] = useState(0);
  const [rentadas, setRentadas] = useState(0);
  const [porVencer, setPorVencer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error");
      return;
    }

    setLoading(true);

    axios
      .get("http://localhost:8080/api/bodegas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBodegas(response.data);
        contarBodegas(response.data);
        detectarPorVencer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las bodegas:", error);
        Swal.fire("Error", "Hubo un problema al obtener las bodegas", "error");
        setLoading(false);
      });
  }, []);

  const contarBodegas = (bodegas) => {
    const disponiblesCount = bodegas.filter((b) => b.status === "DISPONIBLE").length;
    const rentadasCount = bodegas.filter((b) => b.status === "RENTADA").length;
    setDisponibles(disponiblesCount);
    setRentadas(rentadasCount);
  };

  const detectarPorVencer = (bodegas) => {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 7);
    const proximas = bodegas.filter((b) => b.status === "RENTADA"); // Aquí debería ir la lógica con fecha real
    setPorVencer(proximas);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-600 text-lg">Cargando bodegas...</div>
        ) : (
          <>
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-700">Disponibles</h2>
                <p className="text-4xl text-green-600 font-bold">{disponibles}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-700">Rentadas</h2>
                <p className="text-4xl text-orange-500 font-bold">{rentadas}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-700">Por Vencer</h2>
                <p className="text-4xl text-red-500 font-bold">{porVencer.length}</p>
              </div>
            </div>

            {/* Lista de Bodegas */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">Listado de Bodegas</h2>
              <div className="space-y-4">
                {bodegas.map((bodega) => (
                  <div
                    key={bodega.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  >
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">
                          {bodega.folio} - {bodega.tipo} ({bodega.status})
                        </h4>
                        <p className="text-gray-600">Precio: ${bodega.precio}</p>
                        <p className="text-gray-600">Tamaño: {bodega.tamano}</p>
                        <p className="text-gray-600">Edificio: {bodega.edificio}</p>
                        <p className="text-gray-600">Sede: {bodega.sede?.nombre || "No asignada"}</p>
                      </div>
                      <div className="text-sm text-gray-500 italic">
                        ID: {bodega.uuid}
                      </div>
                    </div>
                  </div>
                ))}
                {bodegas.length === 0 && (
                  <p className="text-center text-gray-500">No hay bodegas registradas.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListaBodegas;