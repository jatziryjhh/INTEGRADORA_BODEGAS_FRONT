import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../Navbar"; // Asegúrate de que la ruta sea correcta

const ListaBodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [disponibles, setDisponibles] = useState(0);
  const [rentadas, setRentadas] = useState(0);
  const [porVencer, setPorVencer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Para controlar la visibilidad del modal
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState(null); // Bodega seleccionada para editar

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
    const proximas = bodegas.filter((b) => b.status === "RENTADA" && new Date(b.fechaVencimiento) <= limite);
    setPorVencer(proximas);
  };

  const handleEditClick = (bodega) => {
    setBodegaSeleccionada(bodega);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBodegaSeleccionada(null);
  };

  const handleStatusChange = (newStatus) => {
    const token = localStorage.getItem("token");

    if (!token || !bodegaSeleccionada) return;

    axios
      .put(
        `http://localhost:8080/api/bodegas/${bodegaSeleccionada.uuid}`,
        { ...bodegaSeleccionada, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("Éxito", "Estado actualizado correctamente", "success");
        setBodegas((prevBodegas) =>
          prevBodegas.map((bodega) =>
            bodega.uuid === bodegaSeleccionada.uuid ? { ...bodega, status: newStatus } : bodega
          )
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error al actualizar la bodega:", error);
        Swal.fire("Error", "Hubo un problema al actualizar el estado", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Barra de navegación */}

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
                      <button
                        onClick={() => handleEditClick(bodega)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                      >
                        Editar
                      </button>
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

      {/* Modal de edición */}
      {showModal && bodegaSeleccionada && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Editar Estado de Bodega</h3>
            <div>
              <h4 className="font-bold text-lg mb-2">{bodegaSeleccionada.folio}</h4>
              <p>Estado actual: {bodegaSeleccionada.status}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleStatusChange("DISPONIBLE")}
                  className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Marcar como Disponible
                </button>
                <button
                  onClick={() => handleStatusChange("RENTADA")}
                  className="bg-orange-500 text-white py-2 px-4 rounded-md"
                >
                  Marcar como Rentada
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaBodegas;
