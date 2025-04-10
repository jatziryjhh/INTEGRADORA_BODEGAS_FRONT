import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SedeGestion = () => {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir si no hay autenticación
  const [sedes, setSedes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [sedeEdicion, setSedeEdicion] = useState(null);
  const [error, setError] = useState("");

  // Cargar las sedes al montar el componente
  useEffect(() => {
    const obtenerSedes = async () => {
      const token = localStorage.getItem("token");
      const rol = localStorage.getItem("rol");
      const id = localStorage.getItem("id");

      // Verificar si el token, rol o id están presentes
      if (!token || !rol || !id) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        navigate("/login"); // Redirige al login si no está autenticado
        return;
      }

      try {
        // Guarda nuevamente el token, rol e id por si están desactualizados
        localStorage.setItem("token", token);
        localStorage.setItem("rol", rol);
        localStorage.setItem("id", id);

        const response = await axios.get("http://localhost:8080/api/sedes/", {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
          },
        });

        setSedes(response.data); // Guardar las sedes obtenidas
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
        setError("Error al obtener las sedes"); // Mostrar mensaje de error si la solicitud falla
      }
    };

    obtenerSedes();
  }, [navigate]); // El efecto depende de navigate

  // Validar que el formulario esté completo
  const isFormValid = () => nombre && direccion && codigoPostal;

  // Manejo del submit para crear o editar una sede
  const handleSubmit = async () => {
    if (isFormValid()) {
      const nuevaSede = { nombre, direccion, codigoPostal };

      try {
        if (sedeEdicion) {
          // Editar sede
          const response = await axios.put(
            `http://localhost:8080/api/sedes/${sedeEdicion.id}`,
            nuevaSede
          );
          setSedes((prevSedes) =>
            prevSedes.map((sede) =>
              sede.id === sedeEdicion.id ? response.data : sede
            )
          );
          Swal.fire({
            icon: "success",
            title: "Sede actualizada",
            text: "Los cambios se han guardado correctamente",
          });
        } else {
          // Crear nueva sede
          const response = await axios.post(
            "http://localhost:8080/api/sedes/crear/",
            nuevaSede
          );
          setSedes([...sedes, response.data]);
          Swal.fire({
            icon: "success",
            title: "Sede registrada",
            text: "La sede se ha guardado correctamente",
            showCancelButton: true,
            confirmButtonText: "Ir al listado de sedes",
            cancelButtonText: "Cerrar",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/sedes/listado";
            }
          });
        }

        // Limpiar formulario
        setNombre("");
        setDireccion("");
        setCodigoPostal("");
        setSedeEdicion(null);
      } catch (error) {
        console.error("Error al guardar la sede", error);
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

  // Redirección al listado de sedes
  const handleRedirection = () => {
    window.location.href = "/sedes/listado";
  };

  return (
    <div className="w-full bg-gray-100 text-gray-800 min-h-screen">
      <main className="pt-28 px-6 md:px-12 flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl mb-10">
          <h2 className="text-center text-3xl font-semibold text-teal-600 mb-6">
            {sedeEdicion ? "Editar Sede" : "Alta de Sede"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Nombre de la sede"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Dirección de la sede"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Código Postal"
              type="text"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
          </div>

          <button
            className={`w-full p-3 text-lg rounded-lg transition-all duration-300 ${
              isFormValid() && !sedeEdicion
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isFormValid() || sedeEdicion}
            onClick={handleSubmit}
          >
            {sedeEdicion ? "Guardar Cambios" : "Registrar Sede"}
          </button>

          <button
            className="w-full p-3 mt-4 text-lg rounded-lg bg-orange-600 text-white hover:bg-orange-700"
            onClick={handleRedirection}
          >
            Ir al listado de sedes
          </button>
        </div>

        {/* Lista de Sedes */}
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">
            Lista de Sedes
          </h3>
          <div className="space-y-4">
            {sedes.length > 0 ? (
              sedes.map((sede) => (
                <div
                  key={sede.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {sede.nombre}
                      </h4>
                      <p className="text-gray-600">{sede.direccion}</p>
                      <p className="text-gray-600">{sede.codigoPostal}</p>
                    </div>
                    <button
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
                      onClick={() => setSedeEdicion(sede)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No hay sedes registradas.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SedeGestion;