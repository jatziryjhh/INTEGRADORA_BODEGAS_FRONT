import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaTrashAlt } from "react-icons/fa";

const SedeGestion = () => {
  const navigate = useNavigate();
  const [sedes, setSedes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [administrador, setAdministrador] = useState("");
  const [sedeEdicion, setSedeEdicion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerSedes = async () => {
      const token = localStorage.getItem("token");
      const rol = localStorage.getItem("rol");
      const id = localStorage.getItem("id");

      if (!token || !rol || !id) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/sedes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSedes(response.data);
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
        setError("Error al obtener las sedes");
      }
    };

    obtenerSedes();
  }, [navigate]);

  const isFormValid = () => nombre && direccion && administrador;

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!isFormValid()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor completa todos los campos.",
      });
      return;
    }

    const sedeData = {
      nombre,
      direccion,
      administrador,
      status: true,
    };

    try {
      if (sedeEdicion) {
        // Editar sede
        const response = await axios.put(
          `http://localhost:8080/api/sedes/${sedeEdicion.id}`,
          { ...sedeEdicion, ...sedeData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSedes((prev) =>
          prev.map((sede) =>
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
          "http://localhost:8080/api/sedes/",
          sedeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSedes([...sedes, response.data]);

        Swal.fire({
          icon: "success",
          title: "Sede registrada",
          text: "La sede se ha guardado correctamente",
          showCancelButton: true,
          confirmButtonText: "Ir al listado de sedes",
          cancelButtonText: "Cerrar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/superadmin/sedes");
          }
        });
      }

      // Limpiar formulario
      setNombre("");
      setDireccion("");
      setAdministrador("");
      setSedeEdicion(null);
    } catch (error) {
      console.error("Error al guardar la sede:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar los datos.",
      });
    }
  };

  // Función para cambiar el estado de la sede (activar/desactivar)
  const handleChangeStatus = async (id, nuevoStatus) => {
    const token = localStorage.getItem("token");

    try {
      const sede = sedes.find((s) => s.id === id);
      const updatedSede = { ...sede, status: nuevoStatus };

      await axios.put(
        `http://localhost:8080/api/sedes/${id}`,
        updatedSede,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSedes((prev) =>
        prev.map((sede) => (sede.id === id ? updatedSede : sede))
      );

      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `La sede ha sido ${nuevoStatus ? "activada" : "desactivada"} correctamente.`,
      });
    } catch (error) {
      console.error("Error al cambiar el estado de la sede:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al cambiar el estado de la sede.",
      });
    }
  };

  return (
    <div className="w-full bg-gray-100 text-gray-800 min-h-screen">
      <Navbar />
      <main className="pt-28 px-6 md:px-12 flex flex-col items-center">
        {/* Formulario */}
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl mb-10">
          <h2 className="text-center text-3xl font-semibold text-orange-600 mb-6">
            {sedeEdicion ? "Editar Sede" : "Alta de Sede"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nombre de la sede"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Dirección de la sede"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Administrador"
              value={administrador}
              onChange={(e) => setAdministrador(e.target.value)}
            />
          </div>

          <button
            className={`w-full p-3 text-lg rounded-lg transition-all duration-300 ${
              isFormValid()
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            {sedeEdicion ? "Guardar Cambios" : "Registrar Sede"}
          </button>
        </div>

        {/* Lista de sedes */}
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl mb-6">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">
            Sedes Activas
          </h3>
          <div className="space-y-4">
            {sedes.filter((sede) => sede.status).length > 0 ? (
              sedes
                .filter((sede) => sede.status)
                .map((sede) => (
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
                        <p className="text-gray-600">
                          Administrador: {sede.administrador || "No asignado"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                          onClick={() => {
                            setSedeEdicion(sede);
                            setNombre(sede.nombre);
                            setDireccion(sede.direccion);
                            setAdministrador(sede.administrador || "");
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                          onClick={() => handleChangeStatus(sede.id, false)}
                        >
                          <FaTrashAlt className="mr-2" />
                          Desactivar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No hay sedes activas.</p>
            )}
          </div>
        </div>

        {/* Lista de sedes inactivas */}
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">
            Sedes Inactivas
          </h3>
          <div className="space-y-4">
            {sedes.filter((sede) => !sede.status).length > 0 ? (
              sedes
                .filter((sede) => !sede.status)
                .map((sede) => (
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
                        <p className="text-gray-600">
                          Administrador: {sede.administrador || "No asignado"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                          onClick={() => {
                            setSedeEdicion(sede);
                            setNombre(sede.nombre);
                            setDireccion(sede.direccion);
                            setAdministrador(sede.administrador || "");
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                          onClick={() => handleChangeStatus(sede.id, true)}
                        >
                          Activar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No hay sedes inactivas.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SedeGestion;