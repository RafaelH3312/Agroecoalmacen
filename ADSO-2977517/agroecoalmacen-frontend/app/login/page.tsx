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
      router.push("/"); 
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
        <style jsx>{`
  .usuario-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn-ayuda {
    background: #27ae60; /* verde de tu tema */
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
  }

  .tooltip-ayuda {
    position: absolute;
    top: 38px;
    left: 0;
    background: #2c948b; /* azul-verde de la página */
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    width: 210px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    z-index: 10;
    font-size: 13px;
  }

  .tooltip-ayuda.abierto {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .tooltip-arrow {
    position: absolute;
    top: -6px;
    left: 12px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #2c948b; /* mismo color del tooltip */
  }

  .tooltip-ayuda p {
    margin: 2px 0;
  }
`}</style>

        <footer>
          <p>© 2025 Agroecoalmacen. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
