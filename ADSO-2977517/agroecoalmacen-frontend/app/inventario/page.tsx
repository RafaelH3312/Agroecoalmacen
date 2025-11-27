"use client";

import { useState } from "react";

export default function InventarioPage() {
  const [activo, setActivo] = useState(0);

  const cerrarSesion = () => {
    if (confirm("¿Seguro que deseas cerrar sesión?")) {
      window.location.href = "/login"; 
    }
  };

  const seleccionar = (index: number) => {
    setActivo(index);
  };

  const plantas = [
    {
      img: "/assets/Suculenta Echeveria Iris1.jpg",
      nombre: "Suculenta Echeveria Iris1",
      id: "001",
      temp: "18°C",
      luz: "45000 lux",
      estado: "Exceso luminoso",
      tipo: "alerta",
    },
    {
      img: "/assets/Santa Marta Gold2.jpg",
      nombre: "Santa Marta Gold",
      id: "002",
      temp: "22°C",
      luz: "88000 lux",
      estado: "Sobrefertilización",
      tipo: "alerta",
    },
    {
      img: "/assets/Punto Rojo3.jpg",
      nombre: "Punto Rojo",
      id: "003",
      temp: "28°C",
      luz: "85000 lux",
      estado: "Estable",
      tipo: "activa",
    },
    {
      img: "/assets/Pitahaya4.jpg",
      nombre: "Pitahaya",
      id: "004",
      temp: "28°C",
      luz: "50000 lux",
      estado: "Estable",
      tipo: "activa",
    },
  ];

  return (
    <div style={{ margin: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#1a0f2b", color: "#fff", height: "100vh", overflow: "hidden" }}>
      <div className="fondo" style={{ display: "flex", height: "100vh" }}>

        {/* SIDEBAR */}
        <aside className="sidebar" style={{ width: "20%", backgroundColor: "#2a1b3f", padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2>Agroecoalmacen</h2>
            <nav>
              <a href="/" className="active" style={{ display: "block", color: "#fff", textDecoration: "none", margin: "10px 0", padding: 5, borderRadius: 5 }}>🏠 Panel Principal</a>
 {/* boton de ajustes */}
            </nav>
          </div>

          <div>
            <button
              onClick={cerrarSesion}
              style={{ marginTop: 20, padding: 8, border: "none", borderRadius: 5, backgroundColor: "#ff4d4d", color: "#fff", cursor: "pointer" }}
            >
              ⏻ Cerrar sesión
            </button>
            <h6>RAFAEL ANTONIO PALMAR HERNANDEZ</h6>
          </div>
        </aside>

        {/* PANEL CENTRAL + DERECHO */}
        <div className="ventana" style={{ display: "flex", width: "80%", gap: 20, padding: "20px 0" }}>
          <main className="main" style={{ flex: 1, display: "flex", flexDirection: "column", maxHeight: "100vh" }}>

            <header className="topbar" style={{ padding: "0 20px", marginBottom: 10 }}>
              <p>🟢 Conexión establecida - Sensores activos</p>
            </header>

            <div style={{ textAlign: "center", fontSize: "1.5rem", color: "#8a5aff", margin: "10px 0", fontWeight: "bold" }}>
              Inventario AgroecoAlmacen (Plant's Antony)
            </div>

            <section className="inventario" style={{ display: "flex", flexDirection: "column", gap: 10, backgroundColor: "#24153a", padding: 10, borderRadius: 15, overflowY: "auto", flex: 1 }}>

              {plantas.map((planta, index) => (
                <div
                  key={index}
                  onClick={() => seleccionar(index)}
                  className={`tarjeta ${activo === index ? "activa" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    backgroundColor: activo === index ? "#4a3270" : "#3a2760",
                    border: `2px solid ${activo === index ? "#8a5aff" : "#5a3f8a"}`,
                    borderRadius: 10,
                    padding: 10,
                    gap: 15,
                    cursor: "pointer",
                    transition: "0.3s",
                    flexWrap: "wrap"
                  }}
                >
                  <img
                    src={planta.img}
                    alt={planta.nombre}
                    style={{
                      width: 120,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 8,
                      opacity: activo === index ? 1 : 0,
                      transition: "0.5s"
                    }}
                  />

                  <div className="info" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <h2 style={{ fontSize: "1.1rem", margin: 0, padding: "6px 8px", borderBottom: "2px solid #8a5aff" }}>
                      {planta.nombre}
                    </h2>
                    <p><strong>ID:</strong> {planta.id}</p>
                    <p><strong>Temperatura:</strong> {planta.temp}</p>
                    <p><strong>Luz:</strong> {planta.luz}</p>
                    <p className={planta.tipo === "alerta" ? "estado alerta" : "estado activa"}>{planta.estado}</p>
                  </div>
                </div>
              ))}

            </section>
          </main>

          {/* CONTROL PARENTAL */}
          <aside className="control-parental" style={{ width: "25%", backgroundColor: "#2a1b3f", padding: 15, borderRadius: 10, display: "flex", flexDirection: "column", gap: 10, maxHeight: "100vh", overflowY: "auto" }}>
            <h2>🧭 Control Parental</h2>
            <div className="alert roja">Pitahaya - Exceso de riego</div>
            <div className="alert amarilla">Pimentón - Deficiencia de Nitrógeno</div>
            <div className="alert verde">Echeveria - Correcta</div>
          </aside>
        </div>
      </div>
    </div>
  );
}
