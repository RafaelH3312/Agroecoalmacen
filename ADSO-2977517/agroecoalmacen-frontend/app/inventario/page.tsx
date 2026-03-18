"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

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
    img: data.img
      ? data.img.startsWith("http")
        ? data.img
        : `http://localhost:8080/uploads/${data.img}`
      : "/assets/default.png",
  };
}

export default function Inventario() {
  const router = useRouter();
  const [organismos, setOrganismos] = useState<Organismo[]>([]);
  const [organismoSeleccionado, setOrganismoSeleccionado] = useState<Organismo | null>(null);
  const [preview, setPreview] = useState<Organismo | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string | null>(null);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [activoSidebar, setActivoSidebar] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);

  const [formPlanta, setFormPlanta] = useState<Omit<Organismo, "id" | "img">>({
    nombre_comun: "",
    tipo: "",
    fecha_ingreso: "",
    ubicacion: "",
    estado: "",
    temp: "",
    luz: "",
  });


// Verificar login persistente
useEffect(() => {
  const rol = localStorage.getItem("rol");
  if (!rol) {
    // Si no hay rol, redirige al login inmediatamente
    router.replace("/"); // 🔹 reemplaza la página actual sin dejar rastro
  } else {
    setCargando(false);
  }
}, []);

// ======================================
// Cerrar sesión
// ======================================
const cerrarSesion = async () => {
  if (!confirm("¿Seguro que deseas cerrar sesión?")) return;

  localStorage.removeItem("rol");

  try {
    const res = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    // Redirige al login si la respuesta es 200-299 o 204
    if (res.ok) {
      router.replace("/login");
    } else {
      const text = await res.text(); // opcional para debug
      console.error("Error logout:", text);
      alert("❌ No se pudo cerrar sesión en el servidor");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error al cerrar sesión");
    router.replace("/login"); // 🔹 fuerza redirección aunque haya error
  }
};

  // ===============================
  // Cargar organismos
  // ===============================
  useEffect(() => {
    async function fetchOrganismos() {
      try {
        const res = await fetch("http://localhost:8080/organismos");
        if (!res.ok) throw new Error("Error al obtener organismos");
        const data = await res.json();
        const mapped = data.map(mapOrganismo);
        setOrganismos(mapped);
        if (mapped.length > 0) setOrganismoSeleccionado(mapped[0]);
      } catch (error) {
        console.error(error);
        alert("❌ No se pudieron cargar los organismos");
      }
    }
    fetchOrganismos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPlanta({ ...formPlanta, [e.target.name]: e.target.value });
  };

  const handleImagenChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const archivo = e.target.files[0];
      const url = URL.createObjectURL(archivo);
      setPreviewImagen(url);

      const formData = new FormData();
      formData.append("file", archivo);

      try {
        const res = await fetch("http://localhost:8080/uploads", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error al subir imagen:", text);
          alert("❌ No se pudo subir la imagen");
          return;
        }

        const nombreArchivo = await res.text();
        const ruta = `http://localhost:8080/uploads/${nombreArchivo}`;
        setPreviewImagen(ruta);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        alert("❌ No se pudo subir la imagen");
      }
    }
  };

  const seleccionarOrganismo = (org: Organismo) => {
    setAnimando(true);
    setLoading(true);
    setTimeout(() => {
      setOrganismoSeleccionado(org);
      setFormPlanta({
        nombre_comun: org.nombre_comun,
        tipo: org.tipo,
        fecha_ingreso: org.fecha_ingreso,
        ubicacion: org.ubicacion,
        estado: org.estado,
        temp: org.temp,
        luz: org.luz,
      });
      setPreviewImagen(org.img);
      setLoading(false);
      setAnimando(false);
      setPreview(null);
      setMostrarFormulario(true);
    }, 500);
  };

  const abrirFormularioNuevo = () => {
    setOrganismoSeleccionado(null);
    setFormPlanta({
      nombre_comun: "",
      tipo: "",
      fecha_ingreso: "",
      ubicacion: "",
      estado: "",
      temp: "",
      luz: "",
    });
    setPreviewImagen(null);
    setMostrarFormulario(true);
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setOrganismoSeleccionado(null);
    setPreviewImagen(null);
  };

  const guardarCambios = async () => {
    if (!organismoSeleccionado) return;
    setGuardando(true);
    const updated: Organismo = {
      ...organismoSeleccionado,
      ...formPlanta,
      img: previewImagen || organismoSeleccionado.img,
    };
    try {
      const res = await fetch(`http://localhost:8080/organismos/${organismoSeleccionado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Error al guardar cambios");
      setOrganismos(prev => prev.map(o => (o.id === updated.id ? updated : o)));
      setOrganismoSeleccionado(updated);
      alert("💾 Cambios guardados");
      cancelarFormulario();
    } catch (error) {
      console.error(error);
      alert("❌ No se pudieron guardar los cambios");
    } finally {
      setGuardando(false);
    }
  };

  const eliminarOrganismo = async () => {
    if (!organismoSeleccionado) return;
    if (!confirm("¿Eliminar este organismo?")) return;
    try {
      const res = await fetch(`http://localhost:8080/organismos/${organismoSeleccionado.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar organismo");
      setOrganismos(prev => prev.filter(o => o.id !== organismoSeleccionado.id));
      cancelarFormulario();
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo eliminar el organismo");
    }
  };

  const agregarPlanta = async () => {
    const id = organismos.length > 0 ? organismos[organismos.length - 1].id + 1 : 1;
    const nueva: Organismo = { ...formPlanta, id, img: previewImagen || "/assets/img.jpg" };
    try {
      const res = await fetch("http://localhost:8080/organismos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nueva),
      });
      if (!res.ok) throw new Error("Error al guardar la planta en el servidor");
      setOrganismos([...organismos, nueva]);
      setFormPlanta({
        nombre_comun: "",
        tipo: "",
        fecha_ingreso: "",
        ubicacion: "",
        estado: "",
        temp: "",
        luz: "",
      });
      setPreviewImagen(null);
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo guardar la planta");
    }
  };

  if (cargando) return <div style={{ padding: 20 }}>⏳ Cargando...</div>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
      {/* MAIN */}
      <main style={{ padding: 20, marginLeft: 60 }}>
        <h1>AgroecoAlmacen</h1>
        <h6>Plant's Antony</h6>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {/* VISOR PRINCIPAL */}
          <div
            style={{
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
            }}
          >
            {loading ? "⏳ Espere..." : "📷Live"}
            <img
              src={previewImagen || (preview || organismoSeleccionado)?.img || "/assets/default.png"}
              alt={(preview || organismoSeleccionado)?.nombre_comun || "Preview"}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
            />
          </div>

          {/* FORMULARIO */}
          {mostrarFormulario && (
            <div
              style={{
                width: 320,
                background: "#352441ff",
                padding: 20,
                borderRadius: 16,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                boxSizing: "border-box",
              }}
            >
              <h3 style={{ textAlign: "center" }}>
                {organismoSeleccionado ? "Editar Planta" : "Registrar Nueva Planta"}
              </h3>

              <input placeholder="Nombre" name="nombre_comun" value={formPlanta.nombre_comun} onChange={handleChange} />
              <input placeholder="Tipo" name="tipo" value={formPlanta.tipo} onChange={handleChange} />
              <input placeholder="Fecha ingreso" name="fecha_ingreso" value={formPlanta.fecha_ingreso} onChange={handleChange} />
              <input placeholder="Ubicación" name="ubicacion" value={formPlanta.ubicacion} onChange={handleChange} />
              <input placeholder="Estado" name="estado" value={formPlanta.estado} onChange={handleChange} />
              <input placeholder="Temp" name="temp" value={formPlanta.temp} onChange={handleChange} />
              <input placeholder="Luz" name="luz" value={formPlanta.luz} onChange={handleChange} />
              <input type="file" accept="image/*" onChange={handleImagenChange} />
              {previewImagen && (
                <img
                  src={previewImagen}
                  alt="Preview"
                  style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }}
                />
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
                {!organismoSeleccionado ? (
                  <button onClick={agregarPlanta} style={{ background: "#2980b9", color: "#fff", padding: 6, borderRadius: 6 }}>
                    💾 Guardar
                  </button>
                ) : (
                  <button onClick={guardarCambios} style={{ background: "#2ecc71", color: "#fff", padding: 6, borderRadius: 6 }}>
                    💾 Guardar Cambios
                  </button>
                )}
                {organismoSeleccionado && (
                  <button onClick={eliminarOrganismo} style={{ background: "#e74c3c", color: "#fff", padding: 6, borderRadius: 6 }}>
                    🗑️ Eliminar
                  </button>
                )}
                <button onClick={() => setMostrarFormulario(false)} style={{ background: "#bdc3c7", color: "#000", padding: 6, borderRadius: 6 }}>
                  ❌ Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BOTÓN TOGGLE FORMULARIO AÑADIR */}
        <div style={{ position: "relative", marginTop: 20, height: 60 }}>
          <button
            onClick={abrirFormularioNuevo}
            style={{
              position: "absolute",
              left: 0,
              background: "#27ae60",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 30,
              fontSize: 16,
            }}
          >
            ➕ Añadir Planta
          </button>
        </div>

        {/* MINI-FICHAS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: 15, marginTop: 25 }}>
          {organismos.map(o => (
            <div
              key={o.id}
              onClick={() => seleccionarOrganismo(o)}
              onMouseEnter={() => setPreview(o)}
              onMouseLeave={() => setPreview(null)}
              style={{
                cursor: "pointer",
                borderRadius: 12,
                overflow: "hidden",
                background: "hsla(275,17%,14%,0.57)",
                padding: 5,
                textAlign: "center",
                color: "#fff",
              }}
            >
              <img
                src={o.img}
                alt={o.nombre_comun}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, transition: "transform 0.3s" }}
              />
              <h4 style={{ textAlign: "center", color: "#2c948b" }}>{o.nombre_comun}</h4>
            </div>
          ))}
        </div>
      </main>

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
        <div className="sidebar-titulo">
          <h2>Agroecoalmacen</h2>
          <nav>
            <a href="/" className="nav-link">
              ⟲ <span className="text">Agroecoalmacen</span>
            </a>
            <a href="/ajustes" className="nav-link">
              ⚙️ <span className="text">Ajustes(SINUSO)</span>
            </a>
            <a href="/buscar" className="nav-link">
              🔍 <span className="text">Busca(SINUSO)</span>
            </a>
          </nav>
        </div>

        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
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

      {/* PANEL DERECHO */}
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
            
            <a href="/ajustes" className="nav-link">
              <span className="text">⚙️ Ajustes(SINUSO)</span>
            </a>
            <a href="/buscar" className="nav-link">
              <span className="text">🔍 Buscar(SINUSO)</span>
            </a>
          </nav>
        </div>
        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
        <h6>🟢 Conexión establecida - Sensores activos</h6>
      </aside>

      {/* PANEL DERECHO ALERTAS */}
      <aside
        style={{
          position: "fixed",
          top: 54,
          right: rightMenuOpen ? 0 : -250,
          width: 250,
          height: "100%",
          backgroundColor: "#2c948b",
          padding: 15,
          transition: "right 0.8s",
          zIndex: 100,
          overflowY: "auto",
        }}
      >
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
    </div>
  );
}