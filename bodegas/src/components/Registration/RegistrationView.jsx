import React, { useState } from "react";
import cop from "./img/cop.jpg";
import media from "./img/media.png";
import ValidacionCampo from "../superAdmin/ValidacionCampo"; 
import Swal from "sweetalert2";

const patrones = {
  EMAIL: /^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  TELEFONO: /^(?!\s*$)\d{10}$/,
  RFC: /^(?!\s*$)[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/,
  CODIGOPOS: /^(?!\s*$)\d{5}$/,
  NOMBRE: /^(?!\s*$)(?=.{2,50}$)[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/,
  APELLIDOPATERNO: /^(?!\s*$)(?=.{2,50}$)[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/,
  APELLIDOMATERNO: /^(?!\s*$)(?=.{2,50}$)[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/,
  DIRECCION: /^(?!\s*$)(?=.{5,100}$)[A-ZÁÉÍÓÚÑa-záéíóúñ0-9#.,\-]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ0-9#.,\-]+)*$/
};

export default function RegistrationView() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    telefono: "",
    rfc: "",
    direccion: "",
    codigopos: "",
    password: ""
  });

  const [validaciones, setValidaciones] = useState({
    nombre: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    email: null,
    telefono: null,
    rfc: null,
    direccion: null,
    codigopos: null,
    password: null
  });

  const manejarCambio = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor });
    const regex = patrones[campo.toUpperCase()];
    if (regex) {
      setValidaciones({ ...validaciones, [campo]: regex.test(valor) });
    }
  };

  const manejarRegistro = async () => {
    const todosValidos = Object.values(validaciones).every((v) => v === true);
    if (!todosValidos) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text:'Debes completar todos los campos correctamente.',
        confirmButtonColor: '#FF7700'
      });
      return;
    }

    const datosParaEnviar = { ...formData, rol: "CLIENTE" };

    try {
      const respuesta = await fetch("http://localhost:8080/api/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosParaEnviar)
      });

      if (respuesta.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada correctamente.',
          confirmButtonColor: '#FF7700'
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        setFormData({
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          email: "",
          telefono: "",
          rfc: "",
          direccion: "",
          codigopos: "",
          password: ""
        });
        setValidaciones({
          nombre: null,
          apellidoPaterno: null,
          apellidoMaterno: null,
          email: null,
          telefono: null,
          rfc: null,
          direccion: null,
          codigopos: null,
          password: null
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text:'Hubo un problema al crear tu cuenta.',
          confirmButtonColor: '#FF7700'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text:'Error de conexión o servidor no disponible.',
        confirmButtonColor: '#FF7700'
      });
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${cop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="flex flex-col items-center justify-center w-full py-10">
        <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
          <img
            src={media}
            alt="ChatMedia Logo"
            className="md:h-20 h-8 object-contain mx-auto mb-10"
          />

          {[
            { campo: "nombre", tipo: "text", placeholder: "Nombre" },
            { campo: "apellidoPaterno", tipo: "text", placeholder: "Apellido Paterno" },
            { campo: "apellidoMaterno", tipo: "text", placeholder: "Apellido Materno" },
            { campo: "email", tipo: "email", placeholder: "Correo electrónico" },
            { campo: "telefono", tipo: "tel", placeholder: "Teléfono" },
            { campo: "rfc", tipo: "text", placeholder: "RFC" },
            { campo: "direccion", tipo: "text", placeholder: "Dirección" },
            { campo: "codigopos", tipo: "text", placeholder: "Código Postal" },
            { campo: "password", tipo: "password", placeholder: "Contraseña" }
          ].map(({ campo, tipo, placeholder }) => (
            <div key={campo} className="mb-4">
              <input
                type={tipo}
                placeholder={placeholder}
                value={formData[campo]}
                onChange={(e) => manejarCambio(campo, e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none text-black"
              />
              <ValidacionCampo
                valido={validaciones[campo]}
                mensaje={
                  validaciones[campo] === false
                    ? `Formato inválido para ${placeholder.toLowerCase()}`
                    : `Campo válido`
                }
              />
            </div>
          ))}

          <button
            onClick={manejarRegistro}
            className="w-full bg-[#FF7700] text-white py-2 rounded-md mb-4 hover:bg-[#a77d4e]"
          >
            Registrarse
          </button>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-gray-600 no-underline transition duration-300 hover:underline hover:text-black hover:brightness-125"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
