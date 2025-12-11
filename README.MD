

RAFAEL ANTONIO PALMAR HERNANDEZ
SENA 2025
Evidencia: GA7-220501096-AA3-EV01
Proyecto: AgroecoAlmacen – Módulos Web y Backend
------------------------------------------------------
Comandos principales
------------------------------------------------------

# Backend (Spring Boot)
cd agroecoalmacen-backend
mvn clean install       # Compila y empaqueta el backend
mvn spring-boot:run     # Ejecuta Spring Boot

# Frontend (Next.js)
cd ..\agroecoalmacen-frontend
npm install             # Instala dependencias
npm run dev             # Ejecuta Next.js

# Comprimir proyecto para entrega
cd ..\
Compress-Archive -Path .\Agroecoalmacen\* -DestinationPath "RAFAEL_ANTONIO_PALMAR_HERNANDEZ_AA3_EV01.zip"

# Script para iniciar todo automáticamente
.\start-all.ps1

------------------------------------------------------
Notas adicionales
------------------------------------------------------

- Todas las clases y métodos incluyen comentarios explicativos.
- Se siguen buenas prácticas de codificación y organización de carpetas.
- El proyecto está listo para ejecutarse localmente o con ngrok para pruebas externas.


------------------------------------------------------
Estructura del proyecto con comentarios mínimos
------------------------------------------------------

C:.
├───agroecoalmacen-backend
│    ├───src
│    │    ├───main
│    │    │    ├───java
│    │    │    │    └───com/tuempresa/agroecoalmacen/backend
│    │    │    │         ├───controllers
│    │    │    │         │       OrganismoController.java  # REST para gestionar organismos del inventario
│    │    │    │         ├───models
│    │    │    │         │       Organismo.java  # Modelo entidad JPA de organismos
│    │    │    │         ├───repositories
│    │    │    │         │       OrganismoRepository.java  # Repositorio JPA para Organismo
│    │    │    │         ├───services
│    │    │    │         │       OrganismoService.java  # Lógica de negocio de organismos
│    │    │    │         └───security
│    │    │    │                 SecurityConfig.java  # Configuración de Spring Security
│    │    │    └───resources
│    │    │            application.properties
│    │    └───test
│    │         └───java
│    │                 BackendApplicationTests.java  # Test de contexto Spring Boot
│    ├───pom.xml
│    └───target
│           backend-0.0.1-SNAPSHOT.jar
│
├───agroecoalmacen-frontend
│    ├───.next
│    ├───app
│    │    ├───Card 
│    │    │      Card.jsx
│    │    │      Card.module.css
│    │    │      CardMobile.module.css
│    │    ├───Header
│    │    │      Header.jsx
│    │    │      HeaderDesktop.module.css
│    │    │      HeaderMobile.module.css
│    │    └───PanelSuperior
│    │           PanelSuperior.jsx
│    │           PanelSuperiorDesktop.module.css
│    │           PanelSuperiorMobile.module.css
│    │    favicon.ico
│    │    globals.css
│    │    layout.tsx
│    │    LoginServlet.java  # Clase para login si aplica
│    │    page.tsx
│    ├───inventario
│    │       page.tsx  # Página de inventario de plantas
│    ├───login
│    │       page.tsx  # Página de login
│    └───public
│         file.svg
│         globe.svg
│         next.svg
│         vercel.svg
│         window.svg
│         └───assets
│                 Auyama5.jpg
│                 camara.png
│                 echeveria.png
│                 google.png
│                 logo.png
│                 pimenton Morron6.jpg
│                 pimenton.png
│                 pitahaya.png
│                 Pitahaya4.jpg
│                 Punto Rojo3.jpg
│                 Santa Marta Gold2.jpg
│                 Suculenta Echeveria Iris1.jpg
│
│
├───ngrok.exe
│
└───start-all.ps1  # Script para iniciar Spring Boot, Next.js y ngrok automáticamente

