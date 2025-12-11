"use client";

import React from "react";
import Link from "next/link";

export default function Inventario() {
  const cerrarSesion = () => {
    if (confirm("¿Seguro que deseas cerrar sesión?")) {
      window.location.href = '/login'; // Redirige a login
    }
  };

  return (
    <div className="fondo">
      <div className="ventana">
        <div className="container">

          {/* Sidebar */}
          <aside className="sidebar">
            <h2>Agroecoalmacen</h2>
<nav>
  <a href="/inventario">________⟲________ </a>

  {/* Dashboard principal */}
  <Link href="/" style={{ display: "block", color: "#fff", margin: "10px 0" }}>
   📑 Inventario
  </Link>

  <Link href="/ajustes" style={{ display: "block", color: "#fff", margin: "10px 0" }}>
    ⚙️ Ajustes
  </Link>

  <Link href="/buscar" style={{ display: "block", color: "#fff", margin: "10px 0" }}>
    ________🔍________ 
  </Link>
</nav>

            <button className="btn-logout" onClick={cerrarSesion}>⏻ Cerrar sesión</button>
          </aside>

          {/* Contenido principal */}
          <main className="main">
            {/* Barra superior */}
            <header className="topbar">
              <div className="topbar-left"></div>
              <div className="titulo">
                <h1>Panel Principal</h1>
                <p>Plant's Antony</p>
              </div>
              <div className="topbar-right"></div>
            </header>

            <hr className="divider" />
            <p className="status">🟢 Conexión establecida - Sensores activos</p>

            {/* Panel superior */}
            <section className="panel-superior">
              {/* Cámara */}
              <div className="camara">
                <h2>📷 Cámara de Monitoreo</h2>
                <img src="/assets/camara.png" alt="Cámara" />
              </div>

              {/* Inventario */}
              <div className="inventario">
                <h2>Inventario de Plantas</h2>
                <div className="plantas">
                  <div className="planta">
                    <img src="/assets/pitahaya.png" alt="Pitahaya" />
                    <h4>Pitahaya</h4>
                    <p>Humedad: 78%</p>
                    <div className="barra"><div style={{ width: '78%' }}></div></div>
                    <span className="estado alerta">⚠ Atención</span>
                  </div>
                  <div className="planta">
                    <img src="/assets/pimenton.png" alt="Pimentón" />
                    <h4>Pimentón</h4>
                    <p>Temp: 25°C</p>
                    <div className="barra"><div style={{ width: '85%' }}></div></div>
                    <span className="estado ok">✔ Saludable</span>
                  </div>
                  <div className="planta">
                    <img src="/assets/echeveria.png" alt="Echeveria" />
                    <h4>Echeveria</h4>
                    <p>Temp: 22°C</p>
                    <div className="barra"><div style={{ width: '68%' }}></div></div>
                    <span className="estado ok">✔ Saludable</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Precaución */}
            <div className="control aviso">
              <h2>⚠ ¡Precaución!</h2>
              <div className="alertas">
                <div className="alert verde">Pitahaya - Exceso de riego</div>
                <div className="alert amarilla">Pimentón - Riesgo leve</div>
              </div>
            </div>

            {/* Cards */}
            <section className="cards lista">
              <div className="card verde">
                <h3>🌿 Plantas activas</h3>
                <p>12 registradas</p>
              </div>
              <div className="card amarillo">
                <h3>⚠️ Alertas</h3>
                <p>2 necesitan revisión</p>
              </div>
              <div className="card azul">
                <h3>🌡️ Temperatura media</h3>
                <p>24°C</p>
              </div>
            </section>
          </main>

          {/* Control Parental */}
          <div className="control">
            <h2>🧭 Control Parental</h2>
            <div className="alertas">
              <div className="alert verde">Pitahaya - Exceso de riego</div>
              <div className="alert amarilla">Pimentón - Deficiencia de Nitrógeno</div>
              <div className="alert roja">Echeveria - Correcta</div>
              <h6>RAFAEL ANTONIO PALMAR HERNANDEZ</h6>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}