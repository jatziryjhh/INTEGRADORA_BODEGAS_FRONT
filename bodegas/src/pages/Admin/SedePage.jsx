import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SedeList from "../../components/admin/sedes/SedesList";

const SedePage = () => {
  const [sedes, setSedes] = useState([]);
  const navigate = useNavigate();

  // Cargar sedes al montar el componente
  useEffect(() => {
    fetch("http://localhost:8080/api/sedes/")
      .then((res) => res.json())
      .then((data) => setSedes(data))
      .catch((err) => console.error("Error al cargar sedes:", err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta sede?");
    if (confirmDelete) {
      fetch(`http://localhost:8080/api/sedes/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al eliminar sede");
          }
          setSedes((prevSedes) => prevSedes.filter((sede) => sede.id !== id));
        })
        .catch((err) => console.error("Error al eliminar:", err));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Sedes</h1>

      {/* Botón para agregar nuevas sedes */}
      <button
        className="btn custom-bg btn-wide mb-4"
        onClick={() => navigate("new")}
      >
        Agregar Nueva Sede
      </button>

      {/* Lista de sedes */}
      <SedeList sedes={sedes} onDelete={handleDelete} />
    </div>
  );
};

export default SedePage;
