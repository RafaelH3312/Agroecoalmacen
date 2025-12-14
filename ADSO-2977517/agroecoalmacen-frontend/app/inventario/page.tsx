"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";

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
    img: data.img ?? "/assets/placeholder.png",
  };
}

export default function Inventario() {
  const [organismos, setOrganismos] = useState<Organismo[]>([]);
  const [organismoSeleccionado, setOrganismoSeleccionado] =
    useState<Organismo | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [animando, setAnimando] = useState(false);

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
    await fetch(
      `http://localhost:8080/organismos/${organismoSeleccionado.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organismoSeleccionado),
      }
    );
    alert("💾 Cambios guardados");
    setGuardando(false);
  };

  const eliminarOrganismo = async () => {
    if (!organismoSeleccionado) return;
    if (!confirm("¿Eliminar este organismo?")) return;

    await fetch(
      `http://localhost:8080/organismos/${organismoSeleccionado.id}`,
      { method: "DELETE" }
    );

    setOrganismos((prev) =>
      prev.filter((o) => o.id !== organismoSeleccionado.id)
    );
    setOrganismoSeleccionado(null);
  };

  return (
    <>
      {/* ========== ESTILOS ========== */}
      <style>{`
        .nav-link{
          display:flex;
          gap:10px;
          color:#fff;
          text-decoration:none;
          padding:10px;
        }
        .camara{
          height:220px;
          background:#111;
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:12px;
          margin-bottom:15px;
          transition:.5s;
          opacity:${animando ? 0.4 : 1};
          transform:${animando ? "scale(.95)" : "scale(1)"};
        }
        .acciones button{
          padding:10px 18px;
          border:none;
          border-radius:30px;
          font-weight:bold;
          cursor:pointer;
          margin-right:8px;
        }
        .guardar{background:#2ecc71;color:#fff;}
        .eliminar{background:#e74c3c;color:#fff;}
      `}</style>

      {/* ========== SIDEBAR IZQUIERDA ========== */}
      <aside
        style={{
          width: sidebarOpen ? 220 : 60,
          position: "fixed",
          top: 54,
          left: 0,
          bottom: 0,
          background: "#2c948b",
          color: "#fff",
          transition: "width .6s",
          padding: 10,
          zIndex: 10,
        }}
      >
        <h2 style={{ display: sidebarOpen ? "block" : "none" }}>
          Agroecoalmacen
        </h2>

        <nav>
          <Link href="/" className="nav-link">📑 Panel</Link>
          <Link href="/ajustes" className="nav-link">⚙️ Ajustes</Link>
          <Link href="/buscar" className="nav-link">🔍 Buscar</Link>
        </nav>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            top: 10,
            right: -30,
            fontSize: 28,
          }}
        >
          ☰
        </button>
      </aside>

      {/* ========== MAIN ========== */}
      <main style={{ marginLeft: sidebarOpen ? 220 : 60, padding: 20 }}>
        <h1>Inventario</h1>

        <div className="camara">
          {loading ? "⏳ Cambiando señal..." : "📷 Cámara activa"}
        </div>

        <div>
          <h2>{organismoSeleccionado?.nombre_comun}</h2>

          <label>
            Temp
            <input
              name="temp"
              value={organismoSeleccionado?.temp ?? ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Luz
            <input
              name="luz"
              value={organismoSeleccionado?.luz ?? ""}
              onChange={handleChange}
            />
          </label>

          <div className="acciones">
            <button className="guardar" onClick={guardarCambios}>
              💾 Guardar
            </button>
            <button className="eliminar" onClick={eliminarOrganismo}>
              🗑️ Eliminar
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,200px)", gap: 15 }}>
          {organismos.map((o) => (
            <div key={o.id} onClick={() => seleccionarOrganismo(o)}>
              <Image src={o.img} alt="" width={200} height={140} />
              <h4>{o.nombre_comun}</h4>
            </div>
          ))}
        </div>
      </main>

      {/* ========== PANEL DERECHO ========== */}
      <aside
        style={{
          position: "fixed",
          top: 54,
          right: rightMenuOpen ? 0 : -260,
          width: 260,
          height: "100%",
          background: "#2c948b",
          color: "#fff",
          padding: 15,
          transition: "right .6s",
        }}
      >
        <h2>🚨 Alertas</h2>
        <p>🌱 Pitahaya – exceso de riego</p>
        <p>🌿 Punto rojo – bajo nitrógeno</p>
      </aside>

      <button
        onClick={() => setRightMenuOpen(!rightMenuOpen)}
        style={{
          position: "fixed",
          top: 54,
          right: rightMenuOpen ? 260 : 0,
          fontSize: 28,
        }}
      >
        📩
      </button>
    </>
  );
}
