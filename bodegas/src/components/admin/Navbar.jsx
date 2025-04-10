import React from "react";
import ColorPicker from "../ColorPicker"; // Importamos el componente de selección de color
export default function Navbar({ onOpen }) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm ">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Superadmin</a>
        </div>
        <div className="navbar-end">
          <ColorPicker />
        </div>
      </div>
    </>
  );
}
