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

    // Validación simple: solo admin/weed
    if (usuario === "admin" && clave === "weed") {
      router.push("/"); // redirige a page.tsx
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
          <div className="campo" style={{ position: "relative" }}>
            <label htmlFor="usuario">Usuario</label>
            <div style={{ display: "flex", alignItems: "center" }}>
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
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
                onClick={() => setMostrarAyuda(!mostrarAyuda)}
              >
                Ayuda ⬇
              </button>
            </div>

            <div
              style={{
                position: "absolute",
                top: "3rem",
                left: 0,
                width: "100%",
                maxWidth: "280px",
                background: "#f9f9f9",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: mostrarAyuda ? "0.8rem" : "0",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                zIndex: 10,
                color: "#4B0082"
              }}
            >
              {mostrarAyuda && (
                <div>
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      left: "20px",
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderBottom: "8px solid #f9f9f9"
                    }}
                  />
                  <p><b>Necesitas esto para acceder:</b></p>
                  <p>Usuario: <b>admin</b></p>
                  <p>Contraseña: <b>weed</b></p>
                </div>
              )}
            </div>
          </div>

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

          <button
            type="submit"
            className="btn-login hover:scale-105 transition-transform duration-200"
          >
            Iniciar sesión
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

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

      {/* Animaciones y estilos adicionales */}
      <style jsx>{`
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .input-anim {
          transition: border 0.3s, box-shadow 0.3s;
        }
        .input-anim:focus {
          border-color: #4B0082;
          box-shadow: 0 0 5px rgba(75, 0, 130, 0.5);
          outline: none;
        }
        .btn-login {
          transition: transform 0.2s ease;
        }
      `}</style>
    </div>
  );
}
