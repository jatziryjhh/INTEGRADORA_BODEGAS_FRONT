import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import NavbarCliente from "./NavbarCliente";

const DashboardCliente = () => {
    const [bodegas, setBodegas] = useState([]);

    const obtenerMisBodegas = async () => {
        try {
            const token = localStorage.getItem("token");
            const idUsuario = localStorage.getItem("id");
            const response = await axios.get(`http://localhost:8080/api/bodegas/cliente/${idUsuario}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBodegas(response.data);
            console.log("Bodegas del cliente:", response.data);
        } catch (error) {
            console.error("Error al obtener tus bodegas:", error);
            Swal.fire("Error", "No se pudieron cargar tus bodegas", "error");
        }
    };

    useEffect(() => {
        obtenerMisBodegas();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarCliente />
            <div className="pt-12 px-6 pb-5 w-full max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Tus Bodegas Rentadas</h2>

                {bodegas.length === 0 ? (
                    <p className="text-gray-600 text-center">Aún no tienes bodegas rentadas.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bodegas.map((bodega) => (
                            <div
                                key={bodega.id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-indigo-600">Bodega #{bodega.folio}</h3>
                                <p className="text-black"><span className="font-semibold text-black">Edificio:</span> {bodega.edificio}</p>
                                <p className="text-black" ><span className="font-semibold text-black">Tamaño:</span> {bodega.tamano}</p>
                                <p className="text-black"><span className="font-semibold text-black">Precio:</span> ${bodega.precio}</p>

                                <div className="mt-4 flex items-center space-x-2">
                                    {bodega.status === "RENTADA" ? (
                                        <>
                                            <CheckCircle className="text-green-500 w-5 h-5" />
                                            <span className="text-green-600 font-medium">RENTADA</span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="text-red-500 w-5 h-5" />
                                            <span className="text-red-600 font-medium">Impago</span>
                                        </>
                                    )}
                                </div>

                                {/* Ejemplo: alerta visual si está por vencer */}
                                {bodega.diasRestantes !== undefined && bodega.diasRestantes <= 2 && (
                                    <div className="mt-2 text-yellow-600 flex items-center gap-2 text-sm font-semibold">
                                        <AlertTriangle className="w-4 h-4" />
                                        ¡Tu renta vence pronto!
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardCliente;
