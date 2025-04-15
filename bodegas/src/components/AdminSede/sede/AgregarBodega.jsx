import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../Navbar";

const AgregarBodega = () => {
  const [bodegas, setBodegas] = useState([]);
  const [folio, setFolio] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("DISPONIBLE");
  const [tamano, setTamano] = useState("");
  const [edificio, setEdificio] = useState("");
  const [sede, setSede] = useState("");
  const [sedes, setSedes] = useState([]);
  const [bodegaEdicion, setBodegaEdicion] = useState(null);

  useEffect(() => {
    const obtenerSedes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/sedes/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  const validarCampo = (valor) => valor.trim() !== "";

  const isFormValid = () =>
    validarCampo(folio) &&
    validarCampo(precio) &&
    validarCampo(tipo) &&
    validarCampo(status) &&
    validarCampo(tamano) &&
    validarCampo(edificio) &&
    validarCampo(sede) &&
    parseFloat(precio) >= 0;

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return Swal.fire({
        icon: "error",
        title: "Campos inválidos",
        text: "Por favor completa todos los campos correctamente.",
      });
    }

    const nuevaBodega = {
      folio,
      precio,
      tipo,
      status,
      tamano,
      edificio,
      sede: { id: parseInt(sede) },
    };

    try {
      if (bodegaEdicion) {
        const response = await axios.put(
          `http://localhost:8080/api/bodegas/${bodegaEdicion.id}`,
          nuevaBodega,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBodegas((prev) =>
          prev.map((b) => (b.id === bodegaEdicion.id ? response.data : b))
        );
        Swal.fire("Éxito", "Bodega actualizada correctamente", "success");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/bodegas/crear/",
          nuevaBodega,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
            window.location.href = "/admin/bodegas";
          }
        });
      }

      // Limpiar formulario
      setFolio("");
      setPrecio("");
      setTipo("");
      setStatus("DISPONIBLE");
      setTamano("");
      setEdificio("");
      setSede("");
      setBodegaEdicion(null);
    } catch (error) {
      console.error("Error al guardar", error);
      Swal.fire("Error", "Hubo un problema al guardar los datos.", "error");
    }
  };

  const renderValidacion = (campo, isPrecio = false) => {
    if (campo === "") return null;

    if (isPrecio) {
      if (campo.trim() === "") {
        return <p className="text-red-600 text-sm">❌ Este campo no puede estar vacío</p>;
      }
      if (parseFloat(campo) < 0) {
        return <p className="text-red-600 text-sm">❌ El precio no puede ser negativo</p>;
      }
      return <p className="text-green-600 text-sm">✅ Campo válido</p>;
    }

    return validarCampo(campo) ? (
      <p className="text-green-600 text-sm">✅ Campo válido</p>
    ) : (
      <p className="text-red-600 text-sm">❌ Este campo no puede estar vacío</p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-24 px-4 pb-8 w-full flex justify-center">
        <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
            {bodegaEdicion ? "Editar Bodega" : "Alta de Bodega"}
          </h2>

          {/* Campos con validación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                className="text-black p-3 border border-gray-300 rounded-lg w-full"
                placeholder="Folio (Ej: BODP001)"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
              />
              {renderValidacion(folio)}
            </div>

            <div>
              <input
                className="text-black p-3 border border-gray-300 rounded-lg w-full"
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              {renderValidacion(precio, true)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                className="text-black p-3 border border-gray-300 rounded-lg w-full"
                placeholder="Tipo de Bodega (Ej: Oficina, Almacén)"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
              {renderValidacion(tipo)}
            </div>

            <div>
              <select
                className="text-black p-3 border border-gray-300 rounded-lg w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="DISPONIBLE">DISPONIBLE</option>
                <option value="RENTADA">RENTADA</option>
              </select>
              {renderValidacion(status)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                className="text-black p-3 border border-gray-300 rounded-lg w-full"
                placeholder="Tamaño"
                value={tamano}
                onChange={(e) => setTamano(e.target.value)}
              />
              {renderValidacion(tamano)}
            </div>

            <div>
              <select
                className="text-black p-3 border border-gray-300 rounded-lg w-full"
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
              {renderValidacion(sede)}
            </div>
          </div>

          <div className="mb-6">
            <input
              className="text-black p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Edificio (Ej: A, B, C)"
              value={edificio}
              onChange={(e) => setEdificio(e.target.value)}
            />
            {renderValidacion(edificio)}
          </div>

          {/* Botones */}
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
            onClick={() => (window.location.href = "/admin/bodegas")}
          >
            Volver al listado
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarBodega;
