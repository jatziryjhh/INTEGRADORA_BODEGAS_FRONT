import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SedeForm = ({ sedes }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== undefined;

  const initialState = { nombre: "", direccion: "", administrador: "" };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isEditing && sedes) {
      const sedeToEdit = sedes.find((sede) => sede.id === parseInt(id));
      if (sedeToEdit) {
        setFormData(sedeToEdit);
      }
    }
  }, [id, sedes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:8080/api/sedes/${id}`
      : "http://localhost:8080/api/sedes/";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la sede");
      }

      navigate("/admin/sedes");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar la sede");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Editar Sede" : "Nueva Sede"}
      </h2>

      {/* Nombre de la Sede */}
      <label className="input validator mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          type="text"
          name="nombre"
          required
          placeholder="Nombre de la Sede"
          pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}"
          minLength="3"
          maxLength="50"
          title="Solo letras y espacios, entre 3 y 50 caracteres"
          value={formData.nombre}
          onChange={handleChange}
        />
      </label>
      <p className="validator-hint">
        Debe tener entre 3 y 50 caracteres y solo contener letras.
      </p>

      {/* Ubicación de la Sede */}
      <label className="input validator mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2a10 10 0 1 1-7.07 2.93A10 10 0 0 1 12 2z"></path>
            <path d="M12 6v6h6"></path>
          </g>
        </svg>
        <input
          type="text"
          name="direccion"
          required
          placeholder="Ubicación de la Sede"
          minLength="5"
          maxLength="100"
          title="Debe tener entre 5 y 100 caracteres"
          value={formData.direccion}
          onChange={handleChange}
        />
      </label>
      <p className="validator-hint">Ingrese la ubicación de la sede.</p>

      {/* Administrador de la Sede */}
      <label className="input validator mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2a10 10 0 1 1-7.07 2.93A10 10 0 0 1 12 2z"></path>
            <path d="M12 6v6h6"></path>
          </g>
        </svg>
        <input
          type="text"
          name="administrador"
          required
          placeholder="Administrador de la Sede"
          pattern="[0-9]+"
          title="Debe ser el ID del administrador"
          value={formData.administrador}
          onChange={handleChange}
        />
      </label>
      <p className="validator-hint">
        Debe tener entre 3 y 50 caracteres y solo contener letras.
      </p>

      {/* Botón de Envío */}
      <button className="btn custom-bg btn-wide" type="submit">
        {isEditing ? "Guardar Cambios" : "Agregar Sede"}
      </button>
    </form>
  );
};

export default SedeForm;
