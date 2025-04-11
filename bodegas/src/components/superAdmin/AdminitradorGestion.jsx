import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Importar el Navbar

const AdministradorGestion = () => {
  const navigate = useNavigate();
  const [administradores, setAdministradores] = useState([]);
  const [adminEdicion, setAdminEdicion] = useState(null);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rfc, setRfc] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigopos, setCodigopos] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const obtenerAdmins = async () => {
      const token = localStorage.getItem("token");
      const rol = localStorage.getItem("rol");
      const id = localStorage.getItem("id");

      if (!token || !rol || !id) {
        setError("No estás autenticado. Por favor inicia sesión.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/usuarios/administradores", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAdministradores(response.data);
      } catch (error) {
        console.error("Error al obtener administradores:", error);
        setError("Error al obtener administradores.");
      }
    };

    obtenerAdmins();
  }, [navigate]);

  const isFormValid = () =>
    nombre &&
    apellidoPaterno &&
    apellidoMaterno &&
    email &&
    telefono &&
    rfc &&
    direccion &&
    codigopos &&
    password;

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos.",
      });
      return;
    }

    const nuevoAdmin = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      telefono,
      rfc,
      direccion,
      codigopos,
      password,
      rol: "ADMINISTRADOR",
    };

    try {
      const token = localStorage.getItem("token");

      if (adminEdicion) {
        const response = await axios.put(
          `http://localhost:8080/api/usuarios/${adminEdicion.id}`,
          nuevoAdmin,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAdministradores((prev) =>
          prev.map((a) => (a.id === adminEdicion.id ? response.data : a))
        );
        Swal.fire("Actualizado", "Administrador actualizado correctamente", "success");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/usuarios/crear",
          nuevoAdmin,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAdministradores([...administradores, response.data]);
        Swal.fire({
          icon: "success",
          title: "Administrador registrado",
          text: "El administrador se ha guardado correctamente",
        });
      }

      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setEmail("");
      setTelefono("");
      setRfc("");
      setDireccion("");
      setCodigopos("");
      setPassword("");
      setAdminEdicion(null);
    } catch (error) {
      console.error("Error al guardar administrador:", error);
      Swal.fire("Error", "Hubo un problema al guardar los datos.", "error");
    }
  };

  const handleRedirection = () => {
    window.location.href = "/usuarios/listado";
  };

  return (
    <div className="w-full bg-gray-100 text-gray-800 min-h-screen">
      <Navbar /> {/* Aquí estamos agregando el Navbar */}

      <main className="pt-28 px-6 md:px-12 flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl mb-10">
          <h2 className="text-center text-3xl font-semibold text-orange-600 mb-6">
            {adminEdicion ? "Editar Administrador" : "Alta de Administrador"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="RFC"
              value={rfc}
              onChange={(e) => setRfc(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Código Postal"
              value={codigopos}
              onChange={(e) => setCodigopos(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            className={`w-full p-3 text-lg rounded-lg transition-all duration-300 ${
              isFormValid() && !adminEdicion
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isFormValid() || adminEdicion}
            onClick={handleSubmit}
          >
            {adminEdicion ? "Guardar Cambios" : "Registrar Administrador"}
          </button>

          <button
            className="w-full p-3 mt-4 text-lg rounded-lg bg-orange-600 text-white hover:bg-orange-700"
            onClick={handleRedirection}
          >
            Ir al listado de administradores
          </button>
        </div>

        {/* Lista de administradores */}
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">
            Lista de Administradores
          </h3>
          <div className="space-y-4">
            {administradores.length > 0 ? (
              administradores.map((admin) => (
                <div
                  key={admin.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {admin.nombre} {admin.apellidoPaterno}
                      </h4>
                      <p className="text-gray-600">{admin.email}</p>
                      <p className="text-gray-600">{admin.telefono}</p>
                    </div>
                    <button
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                      onClick={() => {
                        setAdminEdicion(admin);
                        setNombre(admin.nombre);
                        setApellidoPaterno(admin.apellidoPaterno);
                        setApellidoMaterno(admin.apellidoMaterno);
                        setEmail(admin.email);
                        setTelefono(admin.telefono);
                        setRfc(admin.rfc);
                        setDireccion(admin.direccion);
                        setCodigopos(admin.codigopos);
                        setPassword(admin.password);
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No hay administradores registrados.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministradorGestion;