import React, { useEffect, useState } from "react";
import UserAdminList from "../../components/admin/userAdmin/UserAdminList";
import { useNavigate } from "react-router-dom";

const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, []);

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    document.getElementById('my_modal_2').showModal();
  };

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:8080/api/usuarios/${userToDelete}`, {
      method: "DELETE"
    })
      .then(() => {
        setUsers(users.filter(user => user.id !== userToDelete));
        setUserToDelete(null);
        document.getElementById('my_modal_2').close();
      })
      .catch((err) => {
        console.error("Error al eliminar usuario:", err);
        document.getElementById('my_modal_2').close();
      });
  };

  const handleDeleteCancel = () => {
    setUserToDelete(null);
    document.getElementById('my_modal_2').close();
  };

  const adminUsers = users.filter(user => user.rol === "ADMINISTRADOR");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administradores</h1>
      <button className="btn custom-bg btn-wide mb-4" onClick={() => navigate("new")}>
        Agregar Administrador
      </button>
      <UserAdminList users={adminUsers} onDelete={handleDeleteClick} />
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿Estás seguro de eliminar este administrador?</h3>
          <div className="py-4">
            <button className="btn btn-sm btn-outline btn-danger mr-2" onClick={handleDeleteConfirm}>Confirmar</button>
            <button className="btn btn-sm btn-outline btn-secondary" onClick={handleDeleteCancel}>Cancelar</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserAdminPage;
