import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaTrashAlt } from "react-icons/fa";

const AdministradorGestion = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rfc, setRfc] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigopos, setCodigopos] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true);
  const [rol, setRol] = useState("user");
  const [usuarioEdicion, setUsuarioEdicion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
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
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setError("Error al obtener los usuarios");
      }
    };

    obtenerUsuarios();
  }, [navigate]);

  const isFormValid = () =>
    nombre && apellidoPaterno && apellidoMaterno && email && telefono && rol;

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

    const usuarioData = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      telefono,
      rfc,
      direccion,
      codigopos,
      password,
      status,
      rol,
    };

    try {
      if (usuarioEdicion) {
        // Editar usuario
        const response = await axios.put(
          `http://localhost:8080/api/usuarios/${usuarioEdicion.id}`,
          usuarioData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsuarios((prev) =>
          prev.map((usuario) =>
            usuario.id === usuarioEdicion.id ? response.data : usuario
          )
        );

        Swal.fire({
          icon: "success",
          title: "Usuario actualizado",
          text: "Los cambios se han guardado correctamente",
        });
      } else {
        // Crear nuevo usuario
        const response = await axios.post(
          "http://localhost:8080/api/usuarios/",
          usuarioData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsuarios([...usuarios, response.data]);

        Swal.fire({
          icon: "success",
          title: "Usuario registrado",
          text: "El usuario se ha guardado correctamente",
          showCancelButton: true,
          confirmButtonText: "Ir al listado de usuarios",
          cancelButtonText: "Cerrar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/superadmin/usuarios");
          }
        });
      }

      // Limpiar formulario
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setEmail("");
      setTelefono("");
      setRfc("");
      setDireccion("");
      setCodigopos("");
      setPassword("");
      setRol("user");
      setUsuarioEdicion(null);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar los datos.",
      });
    }
  };

  // Función para cambiar el estado de un usuario (activar/desactivar)
  const handleChangeStatus = async (id, nuevoStatus) => {
    const token = localStorage.getItem("token");

    try {
      const usuario = usuarios.find((u) => u.id === id);
      const updatedUsuario = { ...usuario, status: nuevoStatus };

      await axios.put(
        `http://localhost:8080/api/usuarios/${id}`,
        updatedUsuario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsuarios((prev) =>
        prev.map((usuario) => (usuario.id === id ? updatedUsuario : usuario))
      );

      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `El usuario ha sido ${nuevoStatus ? "activado" : "desactivado"} correctamente.`,
      });
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al cambiar el estado del usuario.",
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
            {usuarioEdicion ? "Editar Usuario" : "Alta de Usuario"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="RFC"
              value={rfc}
              onChange={(e) => setRfc(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Código Postal"
              value={codigopos}
              onChange={(e) => setCodigopos(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="user">Usuario</option>
              <option value={"SUPERADMINISTRADOR"}>Super Administrador</option>
              <option value="CLIENTE">Cliente</option>
              <option value="ADMINISTRADOR">Administrador</option>
            </select>
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
            {usuarioEdicion ? "Guardar Cambios" : "Registrar Usuario"}
          </button>
        </div>

        {/* Lista de usuarios */}
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl mb-6">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">
            Usuarios Activos
          </h3>
          <div className="space-y-4">
            {usuarios.filter((usuario) => usuario.status).length > 0 ? (
              usuarios
                .filter((usuario) => usuario.status)
                .map((usuario) => (
                  <div
                    key={usuario.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">
                          {`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`}
                        </h4>
                        <p className="text-gray-600">{usuario.email}</p>
                        <p className="text-gray-600">Rol: {usuario.rol}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                          onClick={() => {
                            setUsuarioEdicion(usuario);
                            setNombre(usuario.nombre);
                            setApellidoPaterno(usuario.apellidoPaterno);
                            setApellidoMaterno(usuario.apellidoMaterno);
                            setEmail(usuario.email);
                            setTelefono(usuario.telefono);
                            setRfc(usuario.rfc);
                            setDireccion(usuario.direccion);
                            setCodigopos(usuario.codigopos);
                            setPassword(""); // Dejar vacío por si se quiere cambiar la contraseña
                            setStatus(usuario.status);
                            setRol(usuario.rol);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                          onClick={() => handleChangeStatus(usuario.id, false)}
                        >
                          <FaTrashAlt className="mr-2" />
                          Desactivar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No hay usuarios activos.</p>
            )}
          </div>
        </div>

        {/* Lista de usuarios inactivos */}
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">
            Usuarios Inactivos
          </h3>
          <div className="space-y-4">
            {usuarios.filter((usuario) => !usuario.status).length > 0 ? (
              usuarios
                .filter((usuario) => !usuario.status)
                .map((usuario) => (
                  <div
                    key={usuario.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">
                          {`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`}
                        </h4>
                        <p className="text-gray-600">{usuario.email}</p>
                        <p className="text-gray-600">Rol: {usuario.rol}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                          onClick={() => {
                            setUsuarioEdicion(usuario);
                            setNombre(usuario.nombre);
                            setApellidoPaterno(usuario.apellidoPaterno);
                            setApellidoMaterno(usuario.apellidoMaterno);
                            setEmail(usuario.email);
                            setTelefono(usuario.telefono);
                            setRfc(usuario.rfc);
                            setDireccion(usuario.direccion);
                            setCodigopos(usuario.codigopos);
                            setPassword(""); // Dejar vacío por si se quiere cambiar la contraseña
                            setStatus(usuario.status);
                            setRol(usuario.rol);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                          onClick={() => handleChangeStatus(usuario.id, true)}
                        >
                          Activar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No hay usuarios inactivos.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministradorGestion;
