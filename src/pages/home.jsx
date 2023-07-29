import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div>
      {/* Encabezado */}
      <header className="home-header">
        Video Cuestionario
      </header>

      {/* Contenido del componente */}
      <div className="home-content">
        <h1>Bienvenido a la Encuesta</h1>
        <p>
          Este sistema te permite grabar preguntas en video y guardarlas para su
          posterior revisión.
        </p>
        {/* Botón para iniciar la encuesta */}
        <Link to="/questions" className="start-button">
          Iniciar encuesta
        </Link>
      </div>
    </div>
  );
}
