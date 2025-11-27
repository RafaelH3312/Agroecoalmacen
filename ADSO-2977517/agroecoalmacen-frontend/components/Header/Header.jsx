"use client";
import Link from "next/link";
import styles from "./Sidebar.module.css"; // o el CSS que uses

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Agroecoalmacen</h2>
      <nav>
        {/* Eliminamos Dashboard */}
        <Link href="/inventario" className={styles.navItem}>
          📦 Inventario
        </Link>
        <Link href="/tienda" className={styles.navItem}>
          🛒 Tienda
        </Link>
        <Link href="/ajustes" className={styles.navItem}>
          ⚙️ Ajustes
        </Link>
      </nav>
    </aside>
  );
}