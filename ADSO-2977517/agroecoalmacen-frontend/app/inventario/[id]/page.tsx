"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
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
    fecha_ingreso: data.fecha_ingreso ?? "",
    ubicacion: data.ubicacion ?? "",
    estado: data.estado ?? "",
    temp: data.temp ?? "25",
    luz: data.luz ?? "Alta",
    img: data.img ?? "/assets/placeholder.png",
  };
}

export default function Inventario() {
  const [organismos, setOrganismos] = useState<Organismo[]>([]);
  const [organismoSeleccionado, setOrganismoSeleccionado] = useState<Organismo | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    async function fetchOrganismos() {
      try {
        const res = await fetch("http://localhost:8080/organismos");
        const data = await res.json();
        const mapped = data.map(mapOrganismo);
        setOrganismos(mapped);
        if (mapped.length > 0) setOrganismoSeleccionado(mapped[0]);
      } catch (error) {
        console.error("Error cargando organismos:", error);
      }
    }
    fetchOrganismos();
  }, []);

  const cerrarSesion = () => {
    if (confirm("¿Seguro que deseas cerrar sesión?")) {
      window.location.href = "/login";
    }
  };

  const seleccionarOrganismo = (org: Organismo) => {
    setOrganismoSeleccionado(org);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!organismoSeleccionado) return;
    const { name, value } = e.target;
    setOrganismoSeleccionado({ ...organismoSeleccionado, [name]: value });
  };

  const guardarCambios = async () => {
    if (!organismoSeleccionado) return;
    setGuardando(true);
    try {
      const res = await fetch(`http://localhost:8080/organismos/${organismoSeleccionado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organismoSeleccionado),
      });
      if (!res.ok) throw new Error("Error guardando cambios");
      setOrganismos((prev) =>
        prev.map((o) => (o.id === organismoSeleccionado.id ? organismoSeleccionado : o))
      );
      alert("Cambios guardados correctamente");
    } catch (error) {
      console.error(error);
      alert("Error guardando cambios");
    } finally {
      setGuardando(false);
    }
  };

  if (!organismoSeleccionado) return <div className="text-center mt-20">Cargando...</div>;

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
        style={{
          width: sidebarOpen ? 220 : 60,
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
          transition: "width 0.8s ease",
        }}
      >
        <h2>Agroecoalmacen</h2>
        <nav className="flex flex-col gap-2">
          <a href="#" className="nav-link">📑 Panel Principal</a>
          <a href="#" className="nav-link">⚙️ Ajustes(SINUSO)</a>
          <a href="#" className="nav-link">🔍 Buscar(SINUSO)</a>
        </nav>
        <button className="btn-logout mt-4" onClick={cerrarSesion}>Cerrar sesión</button>
        <h6 className="status mt-2 text-sm">🟢 Conexión establecida - Sensores activos</h6>
      </aside>

      {/* BOTÓN SIDEBAR */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: "fixed",
          top: 54,
          left: sidebarOpen ? 220 : 60,
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
      <main style={{ marginLeft: sidebarOpen ? 220 : 60, padding: 20 }}>
        <header className="topbar mb-4">
          <h1 className="text-xl font-bold">Inventario Principal</h1>
          <p>Organismos Antony</p>
        </header>

        {/* PANEL SUPERIOR */}
        <section className="panel-superior flex gap-6 mb-6">
          <div className="ficha-tecnica p-4 border rounded-lg bg-white shadow-md" style={{ flex: 1 }}>
            <h2 className="text-lg font-semibold">{organismoSeleccionado.nombre_comun}</h2>
            <p>ID: {organismoSeleccionado.id}</p>

            <label className="block mt-2">
              Temperatura:
              <input
                className="border rounded p-1 w-full"
                name="temp"
                value={organismoSeleccionado.temp}
                onChange={handleChange}
              />
            </label>

            <label className="block mt-2">
              Luz:
              <input
                className="border rounded p-1 w-full"
                name="luz"
                value={organismoSeleccionado.luz}
                onChange={handleChange}
              />
            </label>

            <label className="block mt-2">
              Estado:
              <input
                className="border rounded p-1 w-full"
                name="estado"
                value={organismoSeleccionado.estado}
                onChange={handleChange}
              />
            </label>

            <button
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded"
              onClick={guardarCambios}
              disabled={guardando}
            >
              {guardando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </section>

        {/* MINI-FICHAS */}
        <div className="mini-fichas grid grid-cols-3 gap-4">
          {organismos.map((org) => (
            <div
              key={org.id}
              className="mini-ficha cursor-pointer bg-white p-2 rounded shadow hover:shadow-lg"
              onClick={() => seleccionarOrganismo(org)}
            >
              <Image
                src={org.img}
                alt={org.nombre_comun}
                width={300}
                height={200}
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
              />
              <h4 className="text-center mt-1">{org.nombre_comun}</h4>
            </div>
          ))}
        </div>
      </main>

      {/* PANEL DERECHO */}
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
        {rightMenuOpen && (
          <>
            <h2 className="text-lg font-bold">🧭¡¡ALERTAS!!</h2>
            <div className="alertas flex flex-col gap-2 mt-2">
              <div className="alert bg-red-500 text-white p-2 rounded">Pitahaya - Exceso de riego</div>
              <div className="alert bg-yellow-400 text-black p-2 rounded">Punto Rojo - Deficiencia de Nitrógeno</div>
              <div className="alert bg-green-500 text-white p-2 rounded">Echeveria - Correcta</div>
            </div>
            <h6 className="mt-4 text-sm">RAFAEL ANTONIO PALMAR HERNANDEZ</h6>
          </>
        )}
      </aside>

      {/* BOTÓN DERECHO */}
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
