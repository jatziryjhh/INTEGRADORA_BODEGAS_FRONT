import React from "react";
import cop from "./img/cop.jpg";

export default function WineriesView() {
  const bodegas = [
    {
      id: 1,
      nombre: "Bodega 13B",
      precio: "5045",
      ubicacion: "Temixco",
      tamano: "Grande",
    },
    {
      id: 2,
      nombre: "Bodega 2C",
      precio: "6000",
      ubicacion: "Zapata",
      tamano: "Mediana",
    },
    {
      id: 3,
      nombre: "Bodega 14A",
      precio: "4500",
      ubicacion: "Cuernavaca",
      tamano: "Pequeña",
    },
    {
      id: 4,
      nombre: "Bodega 7B",
      precio: "7000",
      ubicacion: "Jiutepec",
      tamano: "Grande",
    },
  ];

  return (
    <div
      className="h-screen w-screen flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${cop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-orange-600 my-10">
        Bodegas disponibles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
        {bodegas.map((bodega) => (
          <div
            key={bodega.id}
            className="bg-white rounded-lg shadow-md p-16 text-center"
          >
            <h2 className="text-lg font-semibold">{bodega.nombre}</h2>
            <p className="text-2xl font-bold">${bodega.precio}</p>
            <ul className="text-sm text-gray-600 my-4">
              <li>{bodega.ubicacion}</li>
              <li>{bodega.tamano}</li>
              <li>Bodega</li>
            </ul>
            <button className="bg-[#FF7700] text-white py-2 px-4 rounded-md">
              Rentar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
