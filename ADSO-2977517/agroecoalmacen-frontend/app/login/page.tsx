"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
const loginInvitado = async () => {
  console.log("CLICK invitado");

  try {
    const res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: "invitado",
        password: "Invitado_9xP!72@Agro",
      }),
    });

    const data = await res.json();
    console.log("RESPUESTA:", data);

    if (!res.ok) {
      setError("Error al ingresar como invitado");
      return;
    }

sessionStorage.setItem("token", data.jwt);

// 🔥 FIX
sessionStorage.setItem("rol", "Invitado");

router.replace("/inventario");
  } catch (err) {
    console.error(err);
  }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: usuario, password: clave }),
      });

      const data = await res.json();

      console.log("Respuesta login:", data);

      //  VALIDACIÓN MÁS SEGURA
      if (res.ok && data.jwt && data.user) {
        // Guardar datos correctamente
sessionStorage.setItem("token", data.jwt);
sessionStorage.setItem("usuario", data.user.username || "");
sessionStorage.setItem("rol", data.user.role?.name || "");

        console.log("✅ Login exitoso");

        // IMPORTANTE: usar replace (no push)
        router.replace("/inventario");
      } else {
        setError(data.error?.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  const registrarUsuario = async () => {
  try {
    const res = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        email: usuario + "@test.com", // puedes mejorar esto luego
        password: clave,
      }),
    });

    const data = await res.json();

    console.log("Registro:", data);

    if (data.jwt) {
      // auto login después de registrarse
      sessionStorage.setItem("token", data.jwt);
      sessionStorage.setItem("usuario", data.user.username);

      router.replace("/inventario");
    } else {
      setError(data.error?.message || "Error al registrar");
    }

  } catch (err) {
    console.error(err);
    setError("Error de conexión");
  }
};

  const cerrarSesion = () => {
    if (!confirm("¿Deseas cerrar sesión?")) return;
sessionStorage.clear(); // borra todo lo guardado en sessionStorage
router.replace("/login");

  };

  return (
    
    <div className="login-fondo">
      <div className="login-box animate-slide-in">
        <div className="login-header">
          <img src="/assets/logo.png" alt="Logo Agroecoalmacen" className="login-logo" />
          <h1 className="login-title">Agroecoalmacen</h1>
          <p className="login-slogan">Monitoreo inteligente de tus plantas</p>
        </div>
        
  

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="usuario">Usuario</label>
            <div className="usuario-wrapper">
  <input
    type="text"
    id="usuario"
    value={usuario}
    onChange={(e) => setUsuario(e.target.value)}
    placeholder=""
    required
    className="input-anim"
  />

  <button
    type="button"
    className="btn-ayuda"
    onClick={() => {
      setMostrarAyuda(true);
      setTimeout(() => setMostrarAyuda(false), 3000);
    }}
  >
    ¿Ayuda? ⬇
  </button>

  <div className={`tooltip-ayuda ${mostrarAyuda ? "abierto" : ""}`}>
    <div className="tooltip-arrow" />
    <p><b>Necesitas esto para acceder:</b></p>
    <p>Usuario: <b>admin</b></p>
    <p>password: <b>admin123</b></p>
  </div>
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

          <button type="submit" className="btn-login" disabled={cargando}>
            {cargando ? "⏳ Iniciando..." : "Iniciar sesión"}
          </button>

          {error && <p className="error-msg">{error}</p>}
          
        </form>

{mostrarRegistro && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h2>Crear cuenta</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={registrarUsuario}>
          Crear
        </button>

        <button onClick={() => setMostrarRegistro(false)}>
          Cancelar
        </button>
      </div>
    </div>

    <style jsx>{`
  .modal-overlay {
    position: fixed;
    inset: 0; /* 🔥 mejor que top/left/width/height */
    background: rgba(0,0,0,0.6);

    display: flex;
    justify-content: center;  /* 🔥 centra horizontal */
    align-items: center;      /* 🔥 centra vertical */

    z-index: 9999;
  }

  .modal-box {
    background: #352441ff;
    padding: 25px;
    border-radius: 6px;
    width: 320px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    color: #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
  }

  .modal-box input {
    padding: 8px;
    border-radius: 6px;
    border: none;
  }

  .modal-box button {
    background: #2c948b;
    color: #fff;
    border: none;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
  }
`}</style>
  </div>
)}

        
        
        <button
  type="button"
  onClick={() => setMostrarRegistro(true)}
  style={{
    marginTop: 10,
    background: "#2d4221",
    color: "#fff",
    padding: "8px",
    borderRadius: "6px",
  }}
>
Registrarse

</button>


<button
  type="button" 
  onClick={loginInvitado}
  style={{
    marginTop: 10,
    background: "#95a5a6",
    color: "#fff",
    padding: "10px",
    borderRadius: 8,
    width: "100%",
    cursor: "pointer",
  }}
>
  👤 Seguir como invitado
</button>



        <footer>
          <p>© 2025 Agroecoalmacen. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}