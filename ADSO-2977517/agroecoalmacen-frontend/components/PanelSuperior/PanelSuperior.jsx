import React from "react";
import stylesDesktop from "./PanelSuperiorDesktop.module.css";
import stylesMobile from "./PanelSuperiorMobile.module.css";
import useIsMobile from "../hooks/useIsMobile";

export default function PanelSuperior() {
  const isMobile = useIsMobile();
  const styles = isMobile ? stylesMobile : stylesDesktop;

  return (
    <section className={styles.panelSuperior}>
      {/* Cámara */}
      <div className={styles.camara}>
        <h2>📷 Cámara de Monitoreo</h2>
        <img src="/assets/camara.png" alt="Cámara" />
      </div>

      {/* Inventario */}
      <div className={styles.inventario}>
        <h2>Inventario de Plantas</h2>
        <div className={styles.plantas}>
          <div className={styles.planta}>
            <img src="/assets/pitahaya.png" alt="Pitahaya" />
            <h4>Pitahaya</h4>
            <p>Humedad: 78%</p>
            <div className={styles.barra}><div style={{ width: "78%" }}></div></div>
            <span className={styles.estadoAlerta}>⚠ Atención</span>
          </div>
          <div className={styles.planta}>
            <img src="/assets/pimenton.png" alt="Pimentón" />
            <h4>Pimentón</h4>
            <p>Temp: 25°C</p>
            <div className={styles.barra}><div style={{ width: "85%" }}></div></div>
            <span className={styles.estadoOk}>✔ Saludable</span>
          </div>
          <div className={styles.planta}>
            <img src="/assets/echeveria.png" alt="Echeveria" />
            <h4>Echeveria</h4>
            <p>Temp: 22°C</p>
            <div className={styles.barra}><div style={{ width: "68%" }}></div></div>
            <span className={styles.estadoOk}>✔ Saludable</span>
          </div>
        </div>
      </div>
    </section>
  );
}
