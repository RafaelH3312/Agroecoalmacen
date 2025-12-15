"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

interface Organismo {
  id: number;
  nombre_comun: string;
  tipo: string;
  fecha_ingreso: string;
  ubicacion: string;
  estado: string;
  temp: string;
  luz: string;
  img: string;
}

function mapOrganismo(data: any): Organismo {
  return {
    id: data.id,
    nombre_comun: data.nombre_comun,
    tipo: data.tipo,
    fecha_ingreso: data.fecha_ingreso,
    ubicacion: data.ubicacion,
    estado: data.estado,
    temp: data.temp ?? "",
    luz: data.luz ?? "",
    img: data.img ? `/assets/${data.img}` : "/assets/default.png",
  };
}

export default function Inventario() {
  const [organismos, setOrganismos] = useState<Organismo[]>([]);
  const [organismoSeleccionado, setOrganismoSeleccionado] = useState<Organismo | null>(null);
  const [preview, setPreview] = useState<Organismo | null>(null);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [activoSidebar, setActivoSidebar] = useState(true);
const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const cerrarSesion = () => alert("Sesión cerrada");

  useEffect(() => {
    async function fetchOrganismos() {
      const res = await fetch("http://localhost:8080/organismos");
      const data = await res.json();
      const mapped = data.map(mapOrganismo);
      setOrganismos(mapped);
      setOrganismoSeleccionado(mapped[0]);
    }
    fetchOrganismos();
  }, []);

  const seleccionarOrganismo = (org: Organismo) => {
    setAnimando(true);
    setLoading(true);
    setTimeout(() => {
      setOrganismoSeleccionado(org);
      setLoading(false);
      setAnimando(false);
      setPreview(null);
    }, 500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!organismoSeleccionado) return;
    const { name, value } = e.target;
    setOrganismoSeleccionado({ ...organismoSeleccionado, [name]: value });
  };

  const guardarCambios = async () => {
    if (!organismoSeleccionado) return;
    setGuardando(true);
    await fetch(`http://localhost:8080/organismos/${organismoSeleccionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(organismoSeleccionado),
    });
    alert("💾 Cambios guardados");
    setGuardando(false);
  };

  const eliminarOrganismo = async () => {
    if (!organismoSeleccionado) return;
    if (!confirm("¿Eliminar este organismo?")) return;
    await fetch(`http://localhost:8080/organismos/${organismoSeleccionado.id}`, { method: "DELETE" });
    setOrganismos((prev) => prev.filter((o) => o.id !== organismoSeleccionado.id));
    setOrganismoSeleccionado(null);
  };

  return (
    <>
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
        <div>
          <h2>Agroecoalmacen</h2>
          <nav>
            <a href="/" className="nav-link">⟲ <span className="text">📑 Panel Principal</span></a>
            <a href="/ajustes" className="nav-link"> <span className="text">⚙️ Ajustes(SINUSO)</span></a>
            <a href="/buscar" className="nav-link"> <span className="text">🔍 Buscar(SINUSO)</span></a>
          </nav>
        </div>
        <button className="btn-logout" onClick={cerrarSesion}>Cerrar sesión</button>
        <h6>🟢 Conexión establecida - Sensores activos</h6>
      </aside>

      {/* BOTÓN SIDEBAR */}
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

      {/* MAIN */}
      <main style={{ padding: 20, marginLeft: 60 }}>
        <h1>Inventario</h1>

        {/* Cámara + CRUD */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{
            flex: 1,
            height: 280,
            background: "#111",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: animando ? 0.4 : 1,
            transform: animando ? "scale(.95)" : "scale(1)",
            transition: "0.5s",
          }}>
            {loading ? "⏳ Cambiando señal..." : "📷 Cámara activa"}
            {(preview || organismoSeleccionado)?.img && (
              <img
                src={(preview || organismoSeleccionado)?.img}
                alt={(preview || organismoSeleccionado)?.nombre_comun}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
              />
            )}
          </div>

          {organismoSeleccionado && (
            <div style={{
              width: 320,
              background: "#2c948b",
              padding: 20,
              borderRadius: 16,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}>
              <h2 style={{ textAlign: "center" }}>{organismoSeleccionado.nombre_comun}</h2>
              <p><strong>Tipo:</strong> {organismoSeleccionado.tipo}</p>
              <p><strong>Ubicación:</strong> {organismoSeleccionado.ubicacion}</p>
              <p><strong>Estado:</strong> {organismoSeleccionado.estado}</p>
              <label>
                Temp
                <input name="temp" value={organismoSeleccionado.temp} onChange={handleChange} style={{ width: "100%", margin: "5px 0", padding: 6, borderRadius: 6 }}/>
              </label>
              <label>
                Luz
                <input name="luz" value={organismoSeleccionado.luz} onChange={handleChange} style={{ width: "100%", margin: "5px 0", padding: 6, borderRadius: 6 }}/>
              </label>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button onClick={guardarCambios} style={{ background: "#2ecc71", color: "#fff", padding: "10px 18px", border: "none", borderRadius: 30 }}>💾 Guardar</button>
                <button onClick={eliminarOrganismo} style={{ background: "#e74c3c", color: "#fff", padding: "10px 18px", border: "none", borderRadius: 30 }}>🗑️ Eliminar</button>
                <button
  onClick={() => setMostrarFormulario(true)} // o la función que abra tu modal/formulario
  className="bg-green-500 text-white px-4 py-2 rounded ml-2"
>
  Añadir Planta
</button>
              </div>
            </div>
          )}
        </div>

        {/* Mini-fichas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: 15, marginTop: 25 }}>
          {organismos.map(o => (
            <div key={o.id}
              onClick={() => seleccionarOrganismo(o)}
              onMouseEnter={() => setPreview(o)}
              onMouseLeave={() => setPreview(null)}
              style={{ cursor: "pointer", borderRadius: 12, overflow: "hidden", background: "hsla(275,17%,14%,0.57)", padding: 5, textAlign: "center", color: "#fff" }}
            >
              <img src={o.img} alt={o.nombre_comun} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, transition: "transform 0.3s" }} />
              <h4 style={{ textAlign: "center", color: "#2c948b" }}>{o.nombre_comun}</h4>
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
    </>
  );
}
