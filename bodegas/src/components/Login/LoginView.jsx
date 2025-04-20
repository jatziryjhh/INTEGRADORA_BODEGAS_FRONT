import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import back from "./img/cop.jpg";
import media from "./img/media.png";
import front from "./img/front.png";

const images = [
  front,
  "https://todowine.com/wp-content/uploads/2022/03/bodealba-almacen.png",
  "https://png.pngtree.com/png-clipart/20240317/original/pngtree-construction-worker-builder-man-png-image_14611987.png",
  "https://irp.cdn-website.com/9873f9dd/MOBILE/png/896.png",
  "https://irp.cdn-website.com/c78ea348/MOBILE/png/975.png",
  "https://cdn.pixabay.com/photo/2018/06/25/23/06/winery-3498194_1280.png",
];

export default function LoginView() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al iniciar sesión");
      }
  
      const data = await response.json();
  
      if (data.status === false) {
        Swal.fire({
          icon: "error",
          title: "Usuario inactivo",
          text: "Tu cuenta está deshabilitada. Contacta con un administrador.",
        });
        return; 
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("id", data.id);

      if (data.rol === "SUPERADMINISTRADOR") {
        navigate("/superadmin/dashboard");
      } else if (data.rol === "ADMINISTRADOR") {
        navigate("/admin/dashboard");
      } else if (data.rol === "CLIENTE") {
        navigate("/cliente/dashboard");
      }
  
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-4/7 max-w-4xl gap-8">
        <div className="flex flex-col items-center w-2/5">
          <div className="bg-white rounded-xl shadow-xl p-10 w-full">
            <img
              src={media}
              alt="Logo"
              className="md:h-20 h-8 object-contain mx-auto mb-10"
            />

            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full border border-gray-300 rounded-sm p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#FF7700] text-white py-2 rounded-md mb-4 hover:bg-[#a77d4e]"
              >
                Entrar
              </button>
            </form>

            <div className="text-center mb-6">
              <a
                href="/lost-password"
                className="text-sm text-gray-600 no-underline transition duration-300 hover:underline hover:text-black hover:brightness-125"
              >
                ¿Has olvidado la contraseña?
              </a>
            </div>
          </div>

          <div className="bg-white rounded-md p-4 mt-4 w-full text-center shadow-sm text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-[#FF7700] hover:underline">
              Regístrate
            </a>
          </div>
        </div>

        <div className="w-3/5 flex items-center justify-center relative">
          <div className="relative w-full h-full">
            <img
              src={images[currentImageIndex]}
              alt={`Imagen ${currentImageIndex + 1}`}
              className="absolute top-[10px] left-[250px] w-108 h-108 object-contain mix-blend-normal bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
