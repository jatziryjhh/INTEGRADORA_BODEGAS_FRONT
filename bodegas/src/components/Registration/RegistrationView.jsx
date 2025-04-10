import React from "react";
import cop from "./img/cop.jpg";
import media from "./img/media.png";

export default function RegistrationView() {
  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${cop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // 👈 Fondo fijo
      }}
    >
      <div className="flex flex-col items-center justify-center w-full py-10">
        <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
          <img
            src={media}
            alt="ChatMedia Logo"
            className="md:h-20 h-8 object-contain mx-auto mb-10"
          />

          {/* 📌 Formulario de registro completo */}
          <input
            type="text"
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Apellidos"
            className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
          />
          <input
            type="text"
            placeholder="RFC"
            className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Dirección"
            className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Código Postal"
            className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border border-gray-300 rounded-sm p-2 mb-6 focus:outline-none"
          />

          <button className="w-full bg-[#FF7700] text-white py-2 rounded-md mb-4 hover:bg-[#a77d4e]">
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
