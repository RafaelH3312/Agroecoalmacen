"use client";


import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";

const rol = sessionStorage.getItem("rol");
const esInvitado = rol === "Invitado";

interface Organismo {
  id: number;
  documentId: string; // 
  nombre: string;
  tipo: string;
  fecha_ingreso: string;
  estado: string;
  ubicacion: string;
  temp: string;
  luz: string;
  img: string;
  imgId?: number | null;
}

//  MAPEO CORRECTO (img)
const mapOrganismo = (item: any): Organismo => {
  const attrs = item.attributes || item;

  return {
    id: item.id,
    documentId: item.documentId, 
    nombre: attrs.nombre || "",
    tipo: attrs.tipo || "",
    fecha_ingreso: attrs.fecha_ingreso || "",
    estado: attrs.estado || "",
    ubicacion: attrs.ubicacion || "",
    temp: attrs.temp != null ? attrs.temp.toString() : "",
    luz: attrs.luz != null ? attrs.luz.toString() : "",
img: attrs.img?.url
  ? `http://localhost:1337${attrs.img.url}`
  : attrs.img?.data?.url
  ? `http://localhost:1337${attrs.img.data.url}`
  : attrs.img?.data?.attributes?.url
  ? `http://localhost:1337${attrs.img.data.attributes.url}`
  : "/assets/default.png",
  };
};


export default function Inventario() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [organismos, setOrganismos] = useState<Organismo[]>([]);
  const [organismoSeleccionado, setOrganismoSeleccionado] = useState<Organismo | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string | null>(null);

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"ok" | "error" | "">("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [activoSidebar, setActivoSidebar] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);

  const [formPlanta, setFormPlanta] = useState({
    nombre: "",
    tipo: "",
    fecha_ingreso: "",
    estado: "",
    ubicacion: "",
    temp: "",
    luz: "",
  });

  // ---------------- SESIÓN ----------------
  const cerrarSesion = () => {

    sessionStorage.clear();
    router.replace("/login");
  };

  // ---------------- FETCH ----------------
  
const fetchOrganismos = async () => {
  const token = sessionStorage.getItem("token");

  const res = await fetch("http://localhost:1337/api/plantas?populate=*", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  
  

  const data = await res.json();


  setOrganismos(data.data.map(mapOrganismo));
};
useEffect(() => {
  fetchOrganismos();
}, []);
  // ---------------- INPUTS ----------------
  const handleChange = (e: any) => {
    setFormPlanta({ ...formPlanta, [e.target.name]: e.target.value });
  };

  const handleImagenChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPreviewImagen(URL.createObjectURL(e.target.files[0]));
    }
  };

  // ---------------- SELECT ----------------
  const seleccionarOrganismo = (org: Organismo) => {
    setOrganismoSeleccionado(org);
    setFormPlanta({
      nombre: org.nombre,
      tipo: org.tipo,
      fecha_ingreso: org.fecha_ingreso?.split("T")[0],
      estado: org.estado,
      ubicacion: org.ubicacion,
      temp: org.temp,
      luz: org.luz,
    });
    setPreviewImagen(org.img);
    setMostrarFormulario(true);
  };

  const abrirFormularioNuevo = () => {
    setOrganismoSeleccionado(null);
    setFormPlanta({
      nombre: "",
      tipo: "",
      fecha_ingreso: "",
      estado: "",
      ubicacion: "",
      temp: "",
      luz: "",
    });
    setPreviewImagen(null);
    setMostrarFormulario(true);
  };

  
  const dataEnviar = {
  ...formPlanta,
  fecha_ingreso: formPlanta.fecha_ingreso || null,
  temp: formPlanta.temp ? Number(formPlanta.temp) : null,
  luz: formPlanta.luz ? Number(formPlanta.luz) : null,
};


  // ---------------- GUARDAR ----------------
const guardarPlanta = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) return;

  setGuardando(true);
  setMensaje("");

  try {
    const esEdicion = !!organismoSeleccionado;

const url = esEdicion
  ? `http://localhost:1337/api/plantas/${organismoSeleccionado!.documentId}`
  : `http://localhost:1337/api/plantas`;

    //DATA LIMPIA
    const dataEnviar = {
      ...formPlanta,
      fecha_ingreso: formPlanta.fecha_ingreso || null,
      temp: formPlanta.temp ? Number(formPlanta.temp) : null,
      luz: formPlanta.luz ? Number(formPlanta.luz) : null,
    };

    //FETCH BIEN ESTRUCTURADO
    const res = await fetch(url, {
      method: esEdicion ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: dataEnviar,
      }),
    });

    //VALIDACIÓN REAL
    if (!res.ok) {
      const errorText = await res.text();
      console.log("ERROR GUARDAR:", errorText);
      throw new Error();
    }

    const data = await res.json();
const documentIdFinal = esEdicion
  ? organismoSeleccionado!.documentId
  : data.data.documentId;
// BORRAR IMAGEN ANTERIOR
if (esEdicion && organismoSeleccionado?.imgId) {
 await fetch(`http://localhost:1337/api/plantas/${documentIdFinal}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

    //subir nueva imagen
const inputFile = fileInputRef.current;

if (inputFile?.files?.[0]) {
  const formData = new FormData();
  formData.append("files", inputFile.files[0]);

  //  SUBIR IMAGEN
  const uploadRes = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const uploadData = await uploadRes.json();

  const imageId = uploadData[0]?.id;

  // ASIGNAR IMAGEN A LA PLANTA 
 await fetch(`http://localhost:1337/api/plantas/${documentIdFinal}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        img: imageId,
      },
    }),
  });

  inputFile.value = "";
}

    setMensaje("✅ Guardado");    
    setTipoMensaje("ok");

    await fetchOrganismos();
    setPreviewImagen(null);
    setOrganismoSeleccionado(null);
    setMostrarFormulario(false);

  } catch (error) {
    console.error(error);
    setMensaje("❌ Error al guardar");
    setTipoMensaje("error");
  } finally {
    setGuardando(false);
  }
};

  // ---------------- DELETE ----------------
 const eliminarPlanta = async () => {
  if (!organismoSeleccionado) return;

  if (!confirm("¿Eliminar planta?")) return;

  const token = sessionStorage.getItem("token");

  try {
const url = `http://localhost:1337/api/plantas/${organismoSeleccionado.documentId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error();

    // eliminar del estado directamente
    setOrganismos(prev =>
      prev.filter(o => o.id !== organismoSeleccionado.id)
    );

    setMensaje("🗑️ Eliminado");
    setTipoMensaje("ok");

    setOrganismoSeleccionado(null);

  } catch {
    setMensaje("❌ Error al eliminar");
    setTipoMensaje("error");
  }
};
  // -------------------- RENDER -------------------- //


const [cargando, setCargando] = useState(false);
const [loading, setLoading] = useState(false);
const [animando, setAnimando] = useState(false);

const [preview, setPreview] = useState<Organismo | null>(null);

const estados = ["Germinado", "Plantula", "Planta","Vegetativo", "Floracion", "Revegetacion"];
  if (cargando) return <div style={{ padding: 20 }}>⏳ Cargando...</div>;
  return (
    <div style={{ fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
      <main style={{ padding: 20, marginLeft: 60 }}>
        <h1>AgroecoAlmacen</h1>
        <h6>Plant's Antony</h6>

        <div style={{ display: "flex", gap: 20 }}>
          {/* VISOR */}
          <div
  style={{
    width: "50%",
    maxWidth: 600,
    height: 300,
    margin: "0 auto", 
    background: "#111",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    flexShrink: 0, // 
  }}
>
  <img
    src={previewImagen || (preview || organismoSeleccionado)?.img || "/assets/default.png"}
    alt="preview"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover", 
      display: "block",
    }}
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

              <input placeholder="Nombre" name="nombre" value={formPlanta.nombre} onChange={handleChange} />
              <input placeholder="Tipo" name="tipo" value={formPlanta.tipo} onChange={handleChange} />
              <input
  type="date"
  name="fecha_ingreso"
  value={formPlanta.fecha_ingreso}
  onChange={handleChange}
/>


<select name="estado" value={formPlanta.estado} onChange={handleChange}>
<option value="">(Seleccion de estado)</option>
  {estados.map((e: string, i: number) => (
    <option key={i} value={e}>
      {e}
    </option>
  ))}
</select>
              <input placeholder="ubicacion" name="ubicacion" value={formPlanta.ubicacion} onChange={handleChange} />
<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
  <input
    placeholder="Temp"
    name="temp"
    value={formPlanta.temp}
    onChange={handleChange}
    style={{ flex: 1 }}
  />
  <span>°C</span>
</div>

<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
  <input
    placeholder="Luz"
    name="luz"
    value={formPlanta.luz}
    onChange={handleChange}
    style={{ flex: 1 }}
  />
  <span>lux</span>
</div>   <input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleImagenChange}
/>
             
              {previewImagen && (
                <img
                  src={previewImagen}
                  alt="Preview"
                  style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }}
                />
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
               {organismoSeleccionado ? (
<button onClick={guardarPlanta} 
    style={{ background: "#2980b9", color: "#fff", padding: 6, borderRadius: 6 }}
  >
    {guardando ? "Guardando..." : "💾 Guardar"}
  </button>
) : (
<button onClick={guardarPlanta} 
    style={{ background: "#2980b9", color: "#fff", padding: 6, borderRadius: 6 }}
  >
    💾 Guardar
  </button>
)}
                {organismoSeleccionado &&  (
                  <button onClick={eliminarPlanta} 
                  style={{ background: "#e74c3c", color: "#fff", padding: 6, borderRadius: 6 }}>
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
       <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 20,
    marginTop: 30,
  }}
>
          {organismos.map(o => (
<div
  key={o.id}
  onClick={() => seleccionarOrganismo(o)}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.02)";
}}
  onMouseLeave={() => setPreview(null)}
  style={{
    cursor: "pointer",
    borderRadius: 12,
    overflow: "hidden",
    background: "#1f1f1f",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  <img
    src={o.img}
    alt={o.nombre}
    style={{
      width: "100%",
      height: 140,
      objectFit: "cover",
    }}
  />

  <div style={{ padding: 10 }}>
    <h4 style={{ margin: 0, color: "#2c948b" }}>{o.nombre}</h4>
    <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
      {o.tipo}
    </p>
  </div>
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