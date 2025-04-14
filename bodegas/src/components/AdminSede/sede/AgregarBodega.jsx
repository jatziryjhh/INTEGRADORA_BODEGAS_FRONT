import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../Navbar";

const AgregarBodega = () => {
  const [bodegas, setBodegas] = useState([]);
  const [folio, setFolio] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState(""); // Tipo de bodega
  const [status, setStatus] = useState("true"); // Estado de la bodega
  const [tamano, setTamano] = useState("");
  const [edificio, setEdificio] = useState("");
  const [sede, setSede] = useState(""); // Sede
  const [sedes, setSedes] = useState([]); // Lista de sedes
  const [bodegaEdicion, setBodegaEdicion] = useState(null);

  // Obtener la lista de sedes disponibles
  useEffect(() => {
    const obtenerSedes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/sedes/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Sedes obtenidas:", response.data); // Verifica la respuesta
        setSedes(response.data);
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al obtener las sedes.",
        });
      }
    };

    obtenerSedes();
  }, []);

  const isFormValid = () =>
    folio && precio && tipo && tamano && edificio && sede;

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos.",
      });
    }

    const nuevaBodega = { folio, precio, tipo, status, tamano, edificio, sede };

    try {
      if (bodegaEdicion) {
        const response = await axios.put(
          `http://localhost:8080/api/bodegas/${bodegaEdicion.id}`,
          nuevaBodega
        );
        setBodegas((prev) =>
          prev.map((b) => (b.id === bodegaEdicion.id ? response.data : b))
        );
        Swal.fire("Éxito", "Bodega actualizada correctamente", "success");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/bodegas/crear/",
          nuevaBodega
        );
        setBodegas([...bodegas, response.data]);
        Swal.fire({
          icon: "success",
          title: "Bodega registrada",
          text: "Se ha guardado correctamente.",
          showCancelButton: true,
          confirmButtonText: "Ir al listado",
          cancelButtonText: "Permanecer aquí",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/sedes/bodegas";
          }
        });
      }

      setFolio("");
      setPrecio("");
      setTipo("");
      setStatus("true");
      setTamano("");
      setEdificio("");
      setSede("");
      setBodegaEdicion(null);
    } catch (error) {
      console.error("Error al guardar", error);
      Swal.fire("Error", "Hubo un problema al guardar los datos.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 px-4 pb-8 w-full flex justify-center">
        <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
            {bodegaEdicion ? "Editar Bodega" : "Alta de Bodega"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              className="p-3 border border-gray-300 rounded-lg"
              placeholder="Folio (Ej: B32)"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
            />
            <input
              className="p-3 border border-gray-300 rounded-lg"
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              className="p-3 border border-gray-300 rounded-lg"
              placeholder="Tipo de Bodega (Ej: Oficina, Almacen)"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            <select
              className="p-3 border border-gray-300 rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="true">DISPONIBLE</option>
              <option value="false">RENTADA</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              className="p-3 border border-gray-300 rounded-lg"
              placeholder="Tamaño"
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
            />

            <select
              className="p-3 border border-gray-300 rounded-lg"
              value={sede}
              onChange={(e) => setSede(e.target.value)}
            >
              <option value="">Selecciona una sede</option>
              {sedes.map((sedeItem) => (
                <option key={sedeItem.id} value={sedeItem.id}>
                  {sedeItem.nombre}
                </option>
              ))}
            </select>
          </div>

          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            placeholder="Edificio (Ej: A, B, C)"
            value={edificio}
            onChange={(e) => setEdificio(e.target.value)}
          />

          <button
            className={`w-full p-3 text-lg font-semibold rounded-lg transition ${
              isFormValid()
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            {bodegaEdicion ? "Guardar Cambios" : "Registrar Bodega"}
          </button>

          <button
            className="w-full p-3 mt-4 text-lg font-semibold rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={() => (window.location.href = "/sedes/vistabodega")}
          >
            Volver al listado
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarBodega;
