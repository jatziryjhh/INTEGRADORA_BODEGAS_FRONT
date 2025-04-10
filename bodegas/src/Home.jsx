// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <h1>Bienvenido a la página de inicio</h1>
      <p>
        <Link to="/login" className="btn btn-link">
          Ir al Login
        </Link>
      </p>
    </div>
  );
}

export default Home;
