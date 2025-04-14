import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const ListaClientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerClientes = async () => {
      const token = localStorage.getItem("token");
      const rol = localStorage.getItem("rol");
      const id = localStorage.getItem("id");

      if (!token || !rol || !id) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/usuarios/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const soloClientes = response.data.filter((usuario) => usuario.rol === "CLIENTE");
        setClientes(soloClientes);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
        setError("Error al obtener los clientes");
      } finally {
        setLoading(false);
      }
    };

    obtenerClientes();
  }, [navigate]);

  const handleStatusChange = (cliente) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const nuevoStatus = cliente.status === "habilitado" ? "inhabilitado" : "habilitado";

    axios
      .put(
        `http://localhost:8080/api/usuarios/${cliente.id}`,
        { ...cliente, status: nuevoStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("Éxito", "Estado actualizado correctamente", "success");
        setClientes((prevClientes) =>
          prevClientes.map((c) =>
            c.id === cliente.id ? { ...c, status: nuevoStatus } : c
          )
        );
      })
      .catch((error) => {
        console.error("Error al actualizar el estado:", error);
        Swal.fire("Error", "Hubo un problema al actualizar el estado", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Loading */}
        {loading ? (
          <div className="text-center py-12 text-gray-600 text-lg">Cargando clientes...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-semibold text-orange-600">Lista de Clientes</h2>
            </div>

            {/* Lista de Clientes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-orange-500 text-white">
                      <th className="py-2 px-4 text-left text-gray-600">Nombre</th>
                      <th className="py-2 px-4 text-left text-gray-600">Correo</th>
                      <th className="py-2 px-4 text-left text-gray-600">Estado</th>
                      <th className="py-2 px-4 text-left text-gray-600">Pagos Pendientes</th>
                      <th className="py-2 px-4 text-left text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.length > 0 ? (
                      clientes.map((cliente) => (
                        <tr key={cliente.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-4">{cliente.nombre} {cliente.apellidoPaterno} {cliente.apellidoMaterno}</td>
                          <td className="py-2 px-4">{cliente.email}</td>
                          <td className="py-2 px-4">
                            {cliente.status === "habilitado" ? (
                              <span className="text-green-600">Habilitado</span>
                            ) : (
                              <span className="text-red-600">Inhabilitado</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            {cliente.pagosPendientes > 0 ? (
                              <span className="text-red-600">{cliente.pagosPendientes} Pago(s) Pendiente(s)</span>
                            ) : (
                              <span className="text-green-600">Al corriente</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleStatusChange(cliente)}
                              className={`px-4 py-2 rounded-lg ${
                                cliente.status === "habilitado"
                                  ? "bg-red-500 text-white hover:bg-red-600"
                                  : "bg-green-500 text-white hover:bg-green-600"
                              }`}
                            >
                              {cliente.status === "habilitado" ? "Deshabilitar" : "Habilitar"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">
                          No hay clientes registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListaClientes;