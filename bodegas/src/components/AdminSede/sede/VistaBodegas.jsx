import { useState, useEffect } from "react";
import { Menu, LogOut, Plus, Edit, X, Trash } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios"; 

const VistaBodega = () => {
  const [bodegas, setBodegas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBodega, setSelectedBodega] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/bodegas/")
      .then((response) => setBodegas(response.data))
      .catch((error) => console.error("Error al obtener bodegas:", error));
  }, []);

  const handleNewBodega = () => {
    window.location.href = "/sedes/gestion";
  };

  const handleEdit = (bodega) => {
    setSelectedBodega(bodega);
    setModalOpen(true);
  };

  const handleDelete = (bodega) => {
    Swal.fire({
      title: `¿Eliminar la bodega ${bodega.id}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/bodegas/Eliminar/${bodega.id}`)
          .then(() => {
            setBodegas((prev) => prev.filter((b) => b.id !== bodega.id));
            Swal.fire({
              icon: "success",
              title: "Bodega eliminada",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.error("Error al eliminar la bodega:", error));
      }
    });
  };

  const handleInputChange = (field, value) => {
    setSelectedBodega({ ...selectedBodega, [field]: value });
  };

  const validateBodega = (bodega) => {
    if (!bodega.id || bodega.id.trim() === "") {
      return "El folio no puede estar vacío.";
    }
    if (!["Chica", "Mediana", "Grande"].includes(bodega.tamano)) {
      return "Seleccione un tamaño válido (Chica, Mediana o Grande).";
    }
    if (!bodega.edificio || bodega.edificio.trim() === "") {
      return "El edificio no puede estar vacío.";
    }
    if (bodega.edificio.trim().length !== 1 || !/[A-Z]/.test(bodega.edificio.trim())) {
      return "El edificio debe ser una letra mayúscula (ej. A, B, C).";
    }
    if (isNaN(bodega.precio) || Number(bodega.precio) <= 0) {
      return "El precio debe ser un número mayor a cero.";
    }
    if (!["Vacante", "Ocupada", "Fuera de venta"].includes(bodega.estado)) {
      return "Seleccione un estado válido (Vacante, Ocupada o Fuera de venta).";
    }
    return null;
  };

  const handleSaveChanges = () => {
    if (!selectedBodega) return;

    const error = validateBodega(selectedBodega);
    if (error) {
      Swal.fire({
        icon: "warning",
        title: "Validación",
        text: error,
      });
      return;
    }

    // Actualizar la bodega
    axios.put(`http://localhost:8080/api/bodegas/${selectedBodega.id}`, selectedBodega)
      .then((response) => {
        setBodegas((prev) =>
          prev.map((b) => (b.id === selectedBodega.id ? selectedBodega : b))
        );
        setModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Bodega actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los cambios.",
        });
        console.error("Error al actualizar bodega:", error);
      });
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Vacante":
        return "text-green-600";
      case "Ocupada":
        return "text-red-600";
      case "Fuera de venta":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const handleGoToAnotherPage = () => {
    window.location.href = "/sedes/dashboard"; 
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white overflow-hidden">
      <nav className="bg-orange-500 text-white p-4 flex justify-between items-center w-full shadow-md fixed top-0 left-0 z-50">
        <div className="text-lg font-bold">LOGO</div>
        <div className="space-x-4 flex">
          <Menu className="cursor-pointer" />
          <LogOut className="cursor-pointer" />
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-1 w-full min-h-screen bg-white pt-20 px-4 md:px-6">
        <div className="w-full max-w-6xl bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Listado de Bodegas</h1>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600"
              onClick={handleNewBodega}
            >
              <Plus className="w-5 h-5 mr-2" /> Nueva Bodega
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-orange-500 text-white text-center">
                  <th className="p-3 border border-gray-300">Folio</th>
                  <th className="p-3 border border-gray-300">Tamaño</th>
                  <th className="p-3 border border-gray-300">Edificio</th>
                  <th className="p-3 border border-gray-300">Precio</th>
                  <th className="p-3 border border-gray-300">Estado</th>
                  <th className="p-3 border border-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {bodegas.map((bodega, index) => (
                  <tr
                    key={index}
                    className={`text-gray-800 text-center bg-white hover:bg-gray-50`}
                  >
                    <td className="p-3 border border-gray-300">{bodega.id}</td>
                    <td className="p-3 border border-gray-300">{bodega.tamano}</td>
                    <td className="p-3 border border-gray-300">{bodega.edificio}</td>
                    <td className="p-3 border border-gray-300">${bodega.precio}</td>
                    <td className={`p-3 border border-gray-300 font-semibold ${getEstadoColor(bodega.estado)}`}>
                      {bodega.estado}
                    </td>
                    <td className="p-3 border border-gray-300 flex justify-center space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center hover:bg-blue-600"
                        onClick={() => handleEdit(bodega)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center hover:bg-red-600"
                        onClick={() => handleDelete(bodega)}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {bodegas.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-gray-500">
                      No hay bodegas registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={handleGoToAnotherPage}
          className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
        >
          Ir al menu principal
        </button>
      </div>

      {modalOpen && selectedBodega && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-orange-500">Editar Bodega</h2>

            <div className="flex flex-col space-y-6">
              <input
                disabled
                value={selectedBodega.id}
                className="p-3 border-2 border-gray-300 rounded-lg bg-gray-200 text-black font-medium focus:outline-none"
              />
              <select
                value={selectedBodega.tamano}
                onChange={(e) => handleInputChange("tamano", e.target.value)}
                className="p-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Chica">Chica</option>
                <option value="Mediana">Mediana</option>
                <option value="Grande">Grande</option>
              </select>
              <input
                value={selectedBodega.edificio}
                onChange={(e) => handleInputChange("edificio", e.target.value)}
                className="p-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                value={selectedBodega.precio}
                onChange={(e) => handleInputChange("precio", e.target.value)}
                type="number"
                className="p-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <select
                value={selectedBodega.estado}
                onChange={(e) => handleInputChange("estado", e.target.value)}
                className="p-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Vacante">Vacante</option>
                <option value="Ocupada">Ocupada</option>
                <option value="Fuera de venta">Fuera de venta</option>
              </select>
              <button
                onClick={handleSaveChanges}
                className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaBodega;
