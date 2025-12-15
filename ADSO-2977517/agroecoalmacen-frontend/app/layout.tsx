"use client";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1a0f2b, #120b1f, #2c0c3b, #1a0f2b)", // degradado morado-azulado
          backgroundSize: "400% 400%",
          animation: "gradientBG 7s ease infinite",
          color: "#16ccb4ff",
        }}
      >
        {children}

        {/* Animación de fondo */}
        <style>{`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </body>
    </html>
  );
}
