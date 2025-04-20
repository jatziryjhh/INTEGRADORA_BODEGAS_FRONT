import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/reset-password", {
        token,
        newPassword: password,
      });
      setMensaje("¡Contraseña actualizada correctamente!");
      setError("");

      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error(err);
      setError("Error al restablecer la contraseña. Intenta nuevamente.");
      setMensaje("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-black text-2xl font-semibold mb-6 text-center">Restablecer Contraseña</h2>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" text-gray-600  w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          className=" text-gray-600  w-full mb-6 p-2 border border-gray-300 rounded-md"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#FF7700] text-white py-2 rounded-md hover:bg-[#a77d4e]"
        >
          Cambiar contraseña
        </button>

        {mensaje && <p className="text-green-600 mt-4 text-center">{mensaje}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}