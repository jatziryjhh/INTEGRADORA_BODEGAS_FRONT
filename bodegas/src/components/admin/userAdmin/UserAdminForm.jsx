import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserAdminForm = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== undefined;

  const initialState = { 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", 
    rfc: "", 
    address: "", 
    postalCode: "" 
  };
  
  const [formData, setFormData] = useState(initialState);

  // Cargar datos del usuario si es edición
  useEffect(() => {
    if (isEditing && users) {
      const userToEdit = users.find(user => user.id === parseInt(id));
      if (userToEdit) {
        setFormData(userToEdit);
      }
    }
  }, [id, users]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      nombre: formData.firstName,
      apellidoPaterno: formData.lastName,
      apellidoMaterno: "S/N",
      email: formData.email,
      telefono: formData.phone,
      rfc: formData.rfc,
      direccion: formData.address,
      codigopos: formData.postalCode,
      rol: "ADMINISTRADOR",
      password: "Temporal123!" // temporal o aleatorio si es creación
    };
  
    try {
      if (isEditing) {
        await fetch(`http://localhost:8080/api/usuarios/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch("http://localhost:8080/api/usuarios/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
  
      navigate("/admin/administradores");
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Editar Administrador" : "Nuevo Administrador"}</h2>

      {/* Nombre */}
      <label className="input validator mt-4">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>

        <input
          type="text"
          name="firstName"
          required
          placeholder="Nombre"
          pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <p className="validator-hint">
        Debe tener entre 3 y 50 caracteres y solo contener letras.
      </p>

      {/* Apellidos */}
      <label className="input validator mt-4">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>

        <input
          type="text"
          name="lastName"
          required
          placeholder="Apellidos"
          value={formData.lastName}
          onChange={handleChange}
          
        />
      </label>
      <p className="validator-hint">
        Debe tener entre 3 y 50 caracteres y solo contener letras.
      </p>

      {/* Correo Electrónico */}
      <label className="input validator mt-4">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>

        <input
          type="email"
          name="email"
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
        
        />
      </label>
      <p className="validator-hint">
        Debe ser un correo electrónico válido.
      </p>

      {/* Teléfono */}
      <label className="input validator mt-4">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none"><path d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z" fill="currentColor"></path></g></svg>

        <input
          type="tel"
          name="phone"
          required
          pattern="\d{10}"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          
        />
      </label>
      <p className="validator-hint">
        Debe ser un número de teléfono válido (10 dígitos).
      </p>

      {/* RFC */}
      <label className="input validator mt-4">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>

        <input
          type="text"
          name="rfc"
          required
          placeholder="RFC"
          value={formData.rfc}
          onChange={handleChange}
          pattern="[A-Z]{4}\d{6}[A-Z0-9]{3}"
        />
      </label>
      <p className="validator-hint">
        Debe ser un RFC válido (4 letras, 6 dígitos y 3 caracteres alfanuméricos).
      </p>

      {/* Dirección */}
      <label className="input validator mt-4">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M9.5 8.5h5v7h-5z"></path></g></svg>

        <input
          type="text"
          name="address"
          required
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          pattern="[A-Za-z0-9.,# ]{5,100}"
        />
      </label>
      <p className="validator-hint">
        Debe tener entre 5 y 100 caracteres y puede contener letras, números y caracteres especiales.
      </p>

      {/* Código Postal */}
      <label className="input validator mt-4">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M9.5 8.5h5v7h-5z"></path></g></svg>
        <input
          type="text"
          name="postalCode"
          required
          placeholder="Código Postal"
          value={formData.postalCode}
          onChange={handleChange}
          pattern="\d{5}"
        />
      </label>
      <p className="validator-hint">
        Debe ser un código postal válido (5 dígitos).
      </p>

      {/* Botón de Envío */}
      <button className="btn custom-bg btn-wide mt-4" type="submit">
        {isEditing ? "Guardar Cambios" : "Agregar Administrador"}
      </button>
    </form>
  );
};

export default UserAdminForm;
