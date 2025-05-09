import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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

  const handleRedirection = (id) => {
    navigate(`/clientes/${id}/detalle`);
  };

  return (
    <div className="w-full bg-gray-100 text-gray-800 min-h-screen">
      <Navbar />
      <main className="pt-28 px-6 md:px-12 flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl mb-10">
          <h2 className="text-center text-3xl font-semibold text-orange-600 mb-6">
            Lista de Clientes
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Cargando clientes...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left text-gray-600">Nombre</th>
                    <th className="py-2 px-4 text-left text-gray-600">Correo</th>
                    <th className="py-2 px-4 text-left text-gray-600">Estado de Contrato</th>
                    <th className="py-2 px-4 text-left text-gray-600">Pagos Pendientes</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.length > 0 ? (
                    clientes.map((cliente) => (
                      <tr key={cliente.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">
                          {cliente.nombre} {cliente.apellidoPaterno} {cliente.apellidoMaterno}
                        </td>
                        <td className="py-2 px-4">{cliente.email}</td>
                        <td className="py-2 px-4">
                          {cliente.status === "activo" ? (
                            <span className="text-green-600">Activo</span>
                          ) : (
                            <span className="text-red-600">Inactivo</span>
                          )}
                        </td>
                        <td className="py-2 px-4">
                          {cliente.pagosPendientes > 0 ? (
                            <span className="text-red-600">{cliente.pagosPendientes} Pago(s) Pendiente(s)</span>
                          ) : (
                            <span className="text-green-600">Al corriente</span>
                          )}
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
          )}
        </div>
      </main>
    </div>
  );
};

export default ListaClientes;