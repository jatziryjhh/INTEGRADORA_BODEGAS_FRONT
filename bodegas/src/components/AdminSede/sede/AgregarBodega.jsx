import { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios"; // Importamos axios para las peticiones HTTP

const BodegaGestion = () => {
  const [bodegas, setBodegas] = useState([]); // Bodegas del estado
  const [folio, setFolio] = useState("");
  const [precio, setPrecio] = useState("");
  const [tamano, setTamano] = useState("");
  const [vacante, setVacante] = useState("");
  const [edificio, setEdificio] = useState("");
  const [bodegaEdicion, setBodegaEdicion] = useState(null); // Bodega que estás editando

  // Cargar las bodegas desde el backend cuando el componente se monta
  useEffect(() => {
    const obtenerBodegas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bodegas/",{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBodegas(response.data);
      } catch (error) {
        console.error("Error al obtener las bodegas", error);
      }
    };
    obtenerBodegas();
  }, []);

  const isFormValid = () => folio && precio && tamano && vacante && edificio;

  const handleSubmit = async () => {
    if (isFormValid()) {
      const nuevaBodega = { folio, precio, tamano, estado: vacante, edificio };

      try {
        if (bodegaEdicion) {
          // Si estamos editando, hacemos un PUT
          const response = await axios.put(
            `http://localhost:8080/api/bodegas/${bodegaEdicion.id}`,
            nuevaBodega
          );
          setBodegas((prevBodegas) =>
            prevBodegas.map((bodega) =>
              bodega.id === bodegaEdicion.id ? response.data : bodega
            )
          );
          Swal.fire({
            icon: "success",
            title: "Bodega actualizada",
            text: "Los cambios se han guardado correctamente",
          });
        } else {
          // Si es una nueva bodega, hacemos un POST
          const response = await axios.post(
            "http://localhost:8080/api/bodegas/crear/",
            nuevaBodega
          );
          setBodegas([...bodegas, response.data]); // Añadimos la nueva bodega al estado
          Swal.fire({
            icon: "success",
            title: "Bodega registrada",
            text: "Los datos se han guardado correctamente",
            showCancelButton: true,
            confirmButtonText: "Ir al listado de bodegas",
            cancelButtonText: "Cerrar",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/sedes/vistabodega";
            }
          });
        }

        // Resetear el formulario después de guardar
        setFolio("");
        setPrecio("");
        setTamano("");
        setVacante("");
        setEdificio("");
        setBodegaEdicion(null); // Restablecer el estado de edición
      } catch (error) {
        console.error("Error al guardar la bodega", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los datos.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor completa todos los campos.",
      });
    }
  };

  const handleRedirection = () => {
    window.location.href = "/sedes/vistabodega";
  };

  return (
    <div className="w-full font-sans bg-black text-white min-h-screen">
      <main className="pt-28 px-4 md:px-8 flex flex-col items-center min-h-screen bg-black">
        <div className="bg-white text-black w-full max-w-2xl p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-center text-3xl font-bold text-orange-500 mb-6">
            {bodegaEdicion ? "Editar Bodega" : "Alta de Bodega"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Folio (Ej: B32)"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              disabled={bodegaEdicion && bodegaEdicion.estado === "ocupada"}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Precio personalizado"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              disabled={bodegaEdicion && bodegaEdicion.estado === "ocupada"}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
              disabled={bodegaEdicion && bodegaEdicion.estado === "ocupada"}
            >
              <option value="">Tamaño de la bodega</option>
              <option value="chica">Chica</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={vacante}
              onChange={(e) => setVacante(e.target.value)}
              disabled={bodegaEdicion && bodegaEdicion.estado === "ocupada"}
            >
              <option value="">Estado</option>
              <option value="ocupada">Ocupada</option>
              <option value="vacante">Vacante</option>
              <option value="fuera de venta">Fuera de Venta</option>
            </select>
          </div>

          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            placeholder="Edificio (Ej: A, B, C...)"
            value={edificio}
            onChange={(e) => setEdificio(e.target.value)}
            disabled={bodegaEdicion && bodegaEdicion.estado === "ocupada"}
          />

          <button
            className={`w-full p-3 text-lg rounded-lg transition-all duration-300 ${
              isFormValid() && !bodegaEdicion
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isFormValid() || bodegaEdicion}
            onClick={handleSubmit}
          >
            {bodegaEdicion ? "Guardar Cambios" : "Registrar Bodega"}
          </button>

          <button
            className="w-full p-3 mt-4 text-lg rounded-lg bg-orange-600 text-white"
            onClick={handleRedirection}
          >
            Ir al listado de bodegas
          </button>
        </div>
      </main>
    </div>
  );
};

export default BodegaGestion;
