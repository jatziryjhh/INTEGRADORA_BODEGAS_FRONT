import { useState } from "react";
import { Menu, LogOut, Plus, Edit } from "lucide-react";


const VistaCliente = () => {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@example.com",
      estado: "Activo",
      bodegas: [
        { folio: "B1", estadoPago: "Pagado", tamano: "Mediana", edificio: "A" },
        { folio: "B2", estadoPago: "No Pagado", tamano: "Grande", edificio: "B" },
      ],
    },
    {
      id: 2,
      nombre: "María López",
      email: "maria@example.com",
      estado: "Inactivo",
      bodegas: [
        { folio: "B3", estadoPago: "Pagado", tamano: "Chica", edificio: "C" },
      ],
    },
  ]);

  const handleNewCliente = () => {
    window.location.href = "/sedes/gestioncliente";
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
        <div className="w-full max-w-5xl bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Clientes</h1>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600"
              onClick={handleNewCliente} // Redirige directamente
            >
              <Plus className="w-5 h-5 mr-2" /> Nuevo
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="p-3 border border-gray-300">ID</th>
                  <th className="p-3 border border-gray-300">Nombre</th>
                  <th className="p-3 border border-gray-300">Email</th>
                  <th className="p-3 border border-gray-300">Estado</th>
                  <th className="p-3 border border-gray-300">Bodegas Rentadas</th>
                  <th className="p-3 border border-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="text-gray-800 text-center">
                    <td className="p-3 border border-gray-300">{cliente.id}</td>
                    <td className="p-3 border border-gray-300">{cliente.nombre}</td>
                    <td className="p-3 border border-gray-300">{cliente.email}</td>
                    <td className="p-3 border border-gray-300">{cliente.estado}</td>
                    <td className="p-3 border border-gray-300">
                      <ul className="space-y-2">
                        {cliente.bodegas.map((bodega, index) => (
                          <li key={index}>
                            <span>{`Folio: ${bodega.folio} - ${bodega.tamano} - ${bodega.edificio} - ${bodega.estadoPago}`}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 border border-gray-300">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center hover:bg-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        <button
          onClick={handleGoToAnotherPage}
          className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
        >
          Ir al menu de administración
        </button>
      </div>
    </div>
  );
};

export default VistaCliente;
