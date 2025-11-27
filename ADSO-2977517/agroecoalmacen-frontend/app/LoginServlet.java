export default function DashboardPage() {
  const isMobile = useResponsive();

  const cerrarSesion = () => {
    if (confirm("¿Seguro que deseas cerrar sesión?")) {
      window.location.href = '/login';
    }
  };

  return (
    <div className="fondo">
      <div className="ventana">
        <div className="container">
          
          {/* Sidebar: solo se muestra en desktop */}
          {!isMobile && (
            <aside className="sidebar">
              <h2>Agroecoalmacen</h2>
              <nav>
                <a href="#" className="active">🏠 Dashboard</a>
                <a href="#">📦 Inventario</a>
                <a href="#">🛒 Tienda</a>
                <a href="#">⚙️ Ajustes</a>
              </nav>
              <button className="btn-logout" onClick={cerrarSesion}>⏻ Cerrar sesión</button>
            </aside>
          )}

          {/* Contenido principal */}
          <main className={`main ${isMobile ? "mobile-main" : ""}`}>
            {/* Barra superior */}
            <header className="topbar">
              <div className="topbar-left"></div>
              <div className="titulo">
                <h1>Panel Principal</h1>
                <p>Plant's Antony</p>
              </div>
              <div className="topbar-right"></div>
            </header>

            <hr className="divider" />
            <p className="status">🟢 Conexión establecida - Sensores activos</p>

            {/* Panel superior */}
            <section className={`panel-superior ${isMobile ? "mobile-panel" : ""}`}>
              <div className="camara">
                <h2>📷 Cámara de Monitoreo</h2>
                <img src="/assets/camara.png" alt="Cámara" />
              </div>

              <div className="inventario">
                <h2>Inventario de Plantas</h2>
                <div className="plantas">
                  {/* Planta 1 */}
                  <div className="planta">
                    <img src="/assets/pitahaya.png" alt="Pitahaya" />
                    <h4>Pitahaya</h4>
                    <p>Humedad: 78%</p>
                    <div className="barra"><div style={{ width: '78%' }}></div></div>
                    <span className="estado alerta">⚠ Atención</span>
                  </div>
                  {/* Planta 2 */}
                  <div className="planta">
                    <img src="/assets/pimenton.png" alt="Pimentón" />
                    <h4>Pimentón</h4>
                    <p>Temp: 25°C</p>
                    <div className="barra"><div style={{ width: '85%' }}></div></div>
                    <span className="estado ok">✔ Saludable</span>
                  </div>
                  {/* Planta 3 */}
                  <div className="planta">
                    <img src="/assets/echeveria.png" alt="Echeveria" />
                    <h4>Echeveria</h4>
                    <p>Temp: 22°C</p>
                    <div className="barra"><div style={{ width: '68%' }}></div></div>
                    <span className="estado ok">✔ Saludable</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Precaución y Cards podrían también recibir clases móviles */}
          </main>

          {/* Control Parental: opcional en mobile */}
          {!isMobile && (
            <div className="control">
              <h2>🧭 Control Parental</h2>
              <div className="alertas">
                <div className="alert verde">Pitahaya - Exceso de riego</div>
                <div className="alert amarilla">Pimentón - Deficiencia de Nitrógeno</div>
                <div className="alert roja">Echeveria - Correcta</div>
                <h6>RAFAEL ANTONIO PALMAR HERNANDEZ</h6>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
