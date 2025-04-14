import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarCliente from "./NavbarCliente";
import PagoStripe from "./PagoStripe";

const BodegasDisponibles = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState(null);

  const obtenerBodegasDisponibles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/bodegas/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const disponibles = response.data.filter(
        (bodega) => bodega.status === "DISPONIBLE"
      );

      setBodegas(disponibles);
      console.log("Bodegas disponibles:", disponibles);
    } catch (error) {
      console.error("Error al obtener las bodegas disponibles:", error);
      Swal.fire(
        "Error",
        "No se pudieron cargar las bodegas disponibles",
        "error"
      );
    }
  };

  useEffect(() => {
    obtenerBodegasDisponibles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarCliente />
      <div className="pt-10 px-4 pb-5 w-full">
        <h2 className="text-black text-2xl font-semibold mb-6">
          Bodegas disponibles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bodegas.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              No hay bodegas disponibles en este momento.
            </p>
          ) : (
            bodegas.map((bodega) => (
              <div
                key={bodega.id}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-black text-lg font-bold mb-2">
                  Bodega #{bodega.folio}
                </h3>
                <p className="text-black">Edificio: {bodega.edificio}</p>
                <p className="text-black"> Tamaño: {bodega.tamano}</p>
                <p className="text-black">Precio: ${bodega.precio}</p>
                <p className="mt-2 font-semibold text-blue-600">Disponible</p>
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => setBodegaSeleccionada(bodega)}
                >
                  Rentar ahora
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {bodegaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
              onClick={() => setBodegaSeleccionada(null)}
              className="mb-4 text-red-500 font-bold"
            >
              Cerrar
            </button>
            <PagoStripe
              bodega={bodegaSeleccionada}
              onClose={() => setBodegaSeleccionada(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BodegasDisponibles;
