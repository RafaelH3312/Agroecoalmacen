"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usuario === "admin" && clave === "weed") {
      router.push("/inventario"); // redirige a la página de inventario
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-fondo">
      <div className="login-box animate-slide-in">
        <img src="/assets/logo.png" alt="Logo Agroecoalmacen" className="login-logo" />
        <h1>Agroecoalmacen</h1>
        <p className="slogan">Monitoreo inteligente de tus plantas</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Usuario */}
          <div className="campo">
            <label htmlFor="usuario">Usuario</label>
            <div className="usuario-wrapper">
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="admin"
                required
                className="input-anim"
              />
              <button
                type="button"
                className="btn-ayuda"
                onClick={() => setMostrarAyuda(!mostrarAyuda)}
              >
                Ayuda ⬇
              </button>
              <div className={`tooltip-ayuda ${mostrarAyuda ? "abierto" : ""}`}>
                <div className="tooltip-arrow" />
                <p><b>Necesitas esto para acceder:</b></p>
                <p>Usuario: <b>admin</b></p>
                <p>Contraseña: <b>weed</b></p>
              </div>
            </div>
          </div>

          {/* Contraseña */}
          <div className="campo">
            <label htmlFor="clave">Contraseña</label>
            <input
              type="password"
              id="clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              required
              className="input-anim"
            />
          </div>

          <button type="submit" className="btn-login">
            Iniciar sesión
          </button>

          {error && <p className="error-msg">{error}</p>}

          <div className="separador">
            <span>o continuar con</span>
          </div>

          <div className="socials">
            <button
              type="button"
              className="btn-google"
              onClick={() => alert("⚠ Funcionalidad no disponible aún")}
            >
              <img src="/assets/google.png" alt="Google" className="icon-google" />
            </button>
          </div>
        </form>

        <footer>
          <p>© 2025 Agroecoalmacen. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
