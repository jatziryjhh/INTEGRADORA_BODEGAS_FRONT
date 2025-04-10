import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SedesList = ({ sedes, onDelete }) => {
  const [sedeToDelete, setSedeToDelete] = useState(null);
  const navigate = useNavigate();

  // Manejo de la eliminación de sede
  const handleDeleteClick = (id) => {
    setSedeToDelete(id);
    document.getElementById('my_modal_2').showModal(); // Abre el modal
  };

  const handleDeleteConfirm = () => {
    onDelete(sedeToDelete); // Llama la función onDelete pasada como props
    setSedeToDelete(null);
    document.getElementById('my_modal_2').close(); // Cierra el modal
  };

  const handleDeleteCancel = () => {
    setSedeToDelete(null);
    document.getElementById('my_modal_2').close(); // Cierra el modal
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Nombre de la Sede</th>
            <th>Ubicación</th>
            <th>Administrador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sedes.length > 0 ? (
            sedes.map((sede, index) => (
              <tr key={sede.id} className="hover">
                <th>{index + 1}</th>
                <td>{sede.nombre}</td>
                <td>{sede.direccion}</td>
                <td>{sede.administrador}</td>
                <td>
                  {/* Botón Editar */}
                  <button
                    className="btn btn-sm btn-outline btn-primary mr-2"
                    onClick={() => navigate(`/admin/sedes/edit/${sede.id}`)}
                  >
                    Editar
                  </button>

                  {/* Botón Eliminar */}
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDeleteClick(sede.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4">
                No hay sedes registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿Estás seguro de eliminar esta sede?</h3>
          <div className="py-4">
            <button className="btn btn-sm btn-outline btn-danger mr-2" onClick={handleDeleteConfirm}>Confirmar</button>
            <button className="btn btn-sm btn-outline btn-secondary" onClick={handleDeleteCancel}>Cancelar</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SedesList;
