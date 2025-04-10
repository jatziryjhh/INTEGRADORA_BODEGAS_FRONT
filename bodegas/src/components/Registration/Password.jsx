import React from "react";
import cop from "./img/cop.jpg";
import media from "./img/media.png";

export default function Password() {
  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${cop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Fondo fijo
      }}
    >
      <div className="flex flex-col items-center justify-center w-full py-10">
        <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-sm">
          <img
            src={media}
            alt="Logo"
            className="md:h-20 h-8 object-contain mx-auto mb-10"
          />

          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
            Recuperar contraseña
          </h2>

          <p className="text-sm text-gray-600 mb-4 text-center py-2">
            Ingresa tu correo electrónico para restablecer tu contraseña.
          </p>

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border border-gray-300 rounded-sm p-2 mb-6 focus:outline-none"
          />

          <button className="w-full bg-[#FF7700] text-white py-2 rounded-md hover:bg-[#a77d4e]">
            Aceptar
          </button>

          <div className="text-center mt-6">
            <a
              href="/login"
              className="text-sm text-gray-600 no-underline transition duration-300 hover:underline hover:text-black hover:brightness-125"
            >
              ¿Ya recordaste tu contraseña? Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
