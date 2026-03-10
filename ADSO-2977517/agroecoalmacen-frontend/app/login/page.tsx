"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/agroecoalmacen-backend/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ usuario, clave }),
      });

      const data = await res.json();

      if (data.ok) {
        router.push("/"); // Redirigir al dashboard
      } else {
        setError(data.mensaje || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-fondo">
      <div className="login-box animate-slide-in">
        {/* HEADER CENTRADO Y ANIMADO */}
        <div className="login-header">
          <img src="/assets/logo.png" alt="Logo Agroecoalmacen" className="login-logo" />
          <h1 className="login-title">Agroecoalmacen</h1>
          <p className="login-slogan">Monitoreo inteligente de tus plantas</p>
        </div>

        {/* FORMULARIO */}
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
        </form>

        <style jsx>{`
          .login-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 2rem;
            text-align: center;
          }

          .login-logo {
            width: 200px;
            margin-bottom: 1rem;
          }

          .login-title {
            font-size: 3rem;
            font-weight: bold;
            margin: 0;
            color: #b3cde0;
            text-shadow: 0 0 5px #8360c3, 0 0 10px #6a0dad;
            animation: glow 3s ease-in-out infinite alternate;
          }

          .login-slogan {
            font-size: 1.2rem;
            margin-top: 0.5rem;
            color: #c0b3e0;
            text-shadow: 0 0 3px #8360c3;
          }

          @keyframes glow {
            0% { text-shadow: 0 0 5px #8360c3, 0 0 10px #6a0dad; color: #b3cde0; }
            50% { text-shadow: 0 0 15px #8360c3, 0 0 25px #6a0dad; color: #c0b3e0; }
            100% { text-shadow: 0 0 5px #8360c3, 0 0 10px #6a0dad; color: #b3cde0; }
          }

          .usuario-wrapper { position: relative; display: flex; align-items: center; gap: 10px; }
          .btn-ayuda { background: #27ae60; color: #fff; border: none; padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; }
          .tooltip-ayuda { position: absolute; top: 38px; left: 0; background: #2c948b; color: #fff; border-radius: 8px; padding: 10px; width: 210px; opacity: 0; pointer-events: none; transform: translateY(-10px); transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.3); z-index: 10; font-size: 13px; }
          .tooltip-ayuda.abierto { opacity: 1; pointer-events: auto; transform: translateY(0); }
          .tooltip-arrow { position: absolute; top: -6px; left: 12px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid #2c948b; }
          .tooltip-ayuda p { margin: 2px 0; }
        `}</style>

        <footer>
          <p>© 2025 Agroecoalmacen. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
