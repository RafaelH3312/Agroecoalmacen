"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Planta {
  img: string;
  nombre: string;
  id: string;
}

export default function DashboardPage() {
  const [activo, setActivo] = useState<number | null>(null);
  const [activoSidebar, setActivoSidebar] = useState(true);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const plantas: Planta[] = [
    { img: "/assets/Echeveria Eris.jpg", nombre: "Echeveria Eris", id: "001" },
    { img: "/assets/Santa Marta Gold.jpg", nombre: "Santa Marta Gold", id: "002" },
    { img: "/assets/Punto Rojo.jpg", nombre: "Punto Rojo", id: "003" },
    { img: "/assets/Pitahaya.jpg", nombre: "Pitahaya", id: "004" },
  ];

  const seleccionar = (index: number) => {
    setActivo(index);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/inventario");
    }, 1500);
  };

  const cerrarSesion = () => {
    if (confirm("¿Seguro que deseas cerrar sesión?")) {
      router.push("/login");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", overflow: "hidden" }}>

      {/* SIDEBAR IZQUIERDO */}
      <aside
        className={`sidebar ${activoSidebar ? "open" : "closed"}`}
        style={{
          width: activoSidebar ? 221 : 60,
          top: 54,
          backgroundColor: "#2c948b",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 10,
          boxSizing: "border-box",
          boxShadow: "2px 0 15px rgba(0,0,0,0.4)",
          position: "fixed",
          left: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 10,
          transition: "width .8s ease",
        }}
      >
        <style>{`
          .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 5px;
            text-decoration: none;
            color: white;
            font-size: 16px;
            white-space: nowrap;
            transition: opacity .8s ease;
          }
          .sidebar.closed .text { display: none; }
          .sidebar.closed h2 { display: none; }
          .sidebar.closed .logout-text { display: none; }
        `}</style>

        <div>
          <h2>Agroecoalmacen</h2>
          <nav>
            <a href="/" className="nav-link">⟲ <span className="text">Reload</span></a>
            <a href="/ajustes" className="nav-link">⚙️ <span className="text">Ajustes</span></a>
            <a href="/buscar" className="nav-link">🔍 <span className="text">Buscar</span></a>
          </nav>
        </div>

        <button className="btn-logout" onClick={cerrarSesion}>Cerrar sesión</button>
        <h6>🟢 Conexión establecida - Sensores activos</h6>
      </aside>

      {/* BOTÓN SIDEBAR IZQUIERDO */}
      <button
        onClick={() => setActivoSidebar(!activoSidebar)}
        style={{
          position: "fixed",
          top: 54,
          left: activoSidebar ? 221 : 60,
          fontSize: 34,
          backgroundColor: "#2c948b",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          transition: "left 0.8s",
          zIndex: 110,
        }}
      >
        ☰
      </button>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ display: "flex", padding: "20px 10px", flex: 1, position: "relative" }}>
        <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 50 }}>
          <div style={{ textAlign: "center", fontSize: "1.5rem", color: "#2c948b", fontWeight: "bold" }}>
            Panel Principal AgroecoAlmacen
          </div>

          {/* Spinner */}
          {loading && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: activoSidebar ? 220 : 60,
                width: `calc(100% - ${activoSidebar ? 220 : 60}px)`,
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                zIndex: 999,
              }}
            >
              <div style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Ingresando...</div>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: "6px solid #fff",
                borderTop: "6px solid #8a5aff",
                animation: "spin 1s linear infinite",
              }} />
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {/* Plantas */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#2c948b",
            padding: 25,
            borderRadius: 90,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            flex: 1,
            overflowY: "auto",
          }}>
            {plantas.map((planta) => (
              <div
                key={planta.id}
                onClick={() => seleccionar(Number(planta.id))}
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: 50,
                  padding: 8,
                  background: "hsla(275, 17%, 14%, 0.57)",
                  width: 122,
                  transition: "0.8s",
                }}
              >
                <img src={planta.img} style={{ width: 80, height: 60, borderRadius: 8 }} />
                <h4 style={{ color: "#fff", marginTop: 5, fontSize: 12 }}>{planta.nombre}</h4>
                <p style={{ color: "#fff", fontSize: 10 }}>ID: {planta.id}</p>
              </div>
            ))}
          </div>
        </main>

        {/* PANEL DERECHO */}
        <aside style={{
          position: "fixed",
          top: 54,
          right: rightMenuOpen ? 0 : -250,
          width: 250,
          height: "100%",
          backgroundColor: "#2c948b",
          padding: 15,
          borderRadius: "none",
          transition: "right 0.8s",
          zIndex: 100,
          overflowY: "auto",
        }}>
          <style>{`
            .alert {
              padding: 20px;
              margin: 8px 0;
              border-radius:50px;
              font-size: 13px;
              font-weight: bold;
              color: #fff;
            }
            .alert.roja { background: #e74c3c; }
            .alert.amarilla { background: #f1c40f; color:#000; }
            .alert.verde { background: #2ecc71; }
          `}</style>

          {rightMenuOpen && (
            <>
              <h2>🧭¡¡ALERTAS!!</h2>
              <div className="alertas">
                <div className="alert roja">Pitahaya - Exceso de riego</div>
                <div className="alert amarilla">Punto Rojo - Deficiencia de Nitrógeno</div>
                <div className="alert verde">Echeveria - Correcta</div> 
                <h6 className="status">RAFAEL ANTONIO PALMAR HERNANDEZ</h6>
              </div>
            </>
          )}
        </aside>

        {/* BOTÓN PANEL DERECHO */}
        <button
          onClick={() => setRightMenuOpen(!rightMenuOpen)}
          style={{
            position: "fixed",
            top: 54,
            right: rightMenuOpen ? 250 : 0,
            fontSize: 34,
            backgroundColor: "#2c948b",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            transition: "right 0.8s",
            zIndex: 200,
          }}
        >
          📩
        </button>
      </div>
    </div>
  );
}
