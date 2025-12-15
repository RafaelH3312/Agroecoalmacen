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

  // Nuevo estado para formulario de creación
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaPlanta, setNuevaPlanta] = useState<Omit<Organismo, "id" | "img">>({
    nombre_comun: "",
    tipo: "",
    fecha_ingreso: "",
    ubicacion: "",
    estado: "",
    temp: "",
    luz: "",
  });

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

  // Función para agregar nueva planta
  const agregarPlanta = () => {
    const id = organismos.length > 0 ? organismos[organismos.length - 1].id + 1 : 1;
    const nueva: Organismo = { ...nuevaPlanta, id, img: "/assets/default.png" };
    setOrganismos([...organismos, nueva]);
    setNuevaPlanta({
      nombre_comun: "",
      tipo: "",
      fecha_ingreso: "",
      ubicacion: "",
      estado: "",
      temp: "",
      luz: "",
    });
    setMostrarFormulario(false);
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
       <div className="sidebar-titulo">
  <h2>Agroecoalmacen</h2>
  <nav>
            <a href="/" className="nav-link">⟲ <span className="text">📑 Panel Principal</span></a>
            <a href="/ajustes" className="nav-link"> <span className="text">⚙️ Ajustes(SINUSO)</span></a>
            <a href="/buscar" className="nav-link"> <span className="text">🔍 Buscar(SINUSO)</span></a>
          </nav>

  <style jsx>{`
    .sidebar-titulo h2 {
      color: #002844ff; /* azul suave base */
      font-size: 25px;
      font-weight: bold;
      margin: 0 0 12px 0;
      text-shadow: 0 0 5px #8360c3, 0 0 10px #6a0dad;
      animation: glow 3s ease-in-out infinite alternate;
      transition: color 0.1s ease;
    }

    @keyframes glow {
      0% {
        text-shadow: 0 0 5px #8360c3, 0 0 10px #6a0dad;
        color: #007e69ff;
      }
      50% {
        text-shadow: 0 0 15px #8360c3, 0 0 25px #6a0dad;
        color: #c0b3e0;
      }
      100% {
        text-shadow: 0 0 5px #8360c3, 0 0 10px #6a0dad;
        color: #b3cde0;
      }
    }
  `}</style>
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
        <div className="titulo-brillante">
  <h1>AgroecoAlmacen</h1>
  <h6>Plant's Antony</h6>

  <style jsx>{`
    .titulo-brillante {
      background-color: #28272bff;
      padding: 12px 170px;
      border-radius: 12px;
      display: centre;
      margin-bottom: 20px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      color: #cce7ff;
      
    }

    .titulo-brillante h1, .titulo-brillante h6 {
      margin: 0;
      transition: color 1s, text-shadow 1s;
      animation: brillar 2s ease-in-out infinite alternate;
    }

    .titulo-brillante h1 {
      font-size: 45px;
      font-weight: bold;
      color: #a0c4ff;
    }

    .titulo-brillante h6 {
      font-size: 14px;
      font-weight: normal;
      color: #cce7ff;
    }

    @keyframes brillar {
      0% {
        color: #a0c4ff;
        text-shadow: 0 0 5px #5b2c82, 0 0 10px #5b2c82;
      }
      50% {
        color: #b0d0ff;
        text-shadow: 0 0 10px #7c4dff, 0 0 20px #7c4dff;
      }
      100% {
        color: #a0c4ff;
        text-shadow: 0 0 5px #5b2c82, 0 0 10px #5b2c82;
      }
    }
  `}</style>
</div>


        {/* Cámara + CRUD */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{
            flex: 1,
            height: 382,
            background: "#111",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: animando ? 0.4 : 1,
            transform: animando ? "scale(.95)" : "scale(1)",
            transition: "0.9s",
          }}>
            {loading ? "⏳ Espere..." : "📷Live"}
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
              background: "#352441ff",
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
                  onClick={() => setMostrarFormulario(true)}
                  style={{ background: "#27ae60", color: "#fff", padding: "10px 18px", borderRadius: 30 }}
                >
                  ➕ Añadir Planta
                </button>
              </div>

              {/* Formulario de creación */}
              {mostrarFormulario && (
                <div style={{ marginTop: 10, background: "#fff", color: "#000", padding: 10, borderRadius: 8 }}>
                  <h3>Registrar Nueva Planta</h3>
                  <input placeholder="Nombre" value={nuevaPlanta.nombre_comun} onChange={e => setNuevaPlanta({...nuevaPlanta, nombre_comun: e.target.value})} className="border p-1 mb-2 w-full"/>
                  <input placeholder="Tipo" value={nuevaPlanta.tipo} onChange={e => setNuevaPlanta({...nuevaPlanta, tipo: e.target.value})} className="border p-1 mb-2 w-full"/>
                  <input placeholder="Fecha ingreso" value={nuevaPlanta.fecha_ingreso} onChange={e => setNuevaPlanta({...nuevaPlanta, fecha_ingreso: e.target.value})} className="border p-1 mb-2 w-full"/>
                  <input placeholder="Ubicación" value={nuevaPlanta.ubicacion} onChange={e => setNuevaPlanta({...nuevaPlanta, ubicacion: e.target.value})} className="border p-1 mb-2 w-full"/>
                  <input placeholder="Estado" value={nuevaPlanta.estado} onChange={e => setNuevaPlanta({...nuevaPlanta, estado: e.target.value})} className="border p-1 mb-2 w-full"/>
                  <input placeholder="Temp" value={nuevaPlanta.temp} onChange={e => setNuevaPlanta({...nuevaPlanta, temp: e.target.value})} className="border p-1 mb-2 w-full"/>
                  <input placeholder="Luz" value={nuevaPlanta.luz} onChange={e => setNuevaPlanta({...nuevaPlanta, luz: e.target.value})} className="border p-1 mb-2 w-full"/>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={agregarPlanta} style={{ background: "#2980b9", color: "#fff", padding: "6px 12px", borderRadius: 6 }}>Guardar</button>
                    <button onClick={() => setMostrarFormulario(false)} style={{ background: "#bdc3c7", color: "#000", padding: "6px 12px", borderRadius: 6 }}>Cancelar</button>
                  </div>
                </div>
              )}
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
              <h2 className="alerta-animada">🧭¡¡ALERTAS!!</h2>

<style jsx>{`
.alerta-animada {
  font-size: 24px;
  font-weight: bold;
  color: #fe9b9bff; 
  text-align: center;
  animation: brilloAlert 0.3s ease-in-out infinite alternate;
  text-shadow: 0 0 5px #e7785cff, 0 0 10px #ec5700ff;
}

@keyframes brilloAlert {
  0% { color: #df9901; text-shadow: 0 0 5px #6c5ce7, 0 0 10px #636e72; }
  50% { color: #df9801ff; text-shadow: 0 0 10px #d2e75cff, 0 0 20px #6c5ce7; }
  100% { color: #df0101ff; text-shadow: 0 0 5px #6c5ce7, 0 0 10px #636e72; }
}
`}</style>

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
