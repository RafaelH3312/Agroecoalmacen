-- Crear base de datos
CREATE DATABASE agroecoalmacen;
USE agroecoalmacen;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE cuentas;
SET FOREIGN_KEY_CHECKS = 1;


TRUNCATE TABLE organismos;

DELETE FROM organismos WHERE id > 0;
SELECT * FROM organismos;
ALTER TABLE organismos AUTO_INCREMENT = 1;

DROP table organismos;
delete from caracteristicas_organismo;

SET SQL_SAFE_UPDATES = 0;


-- Tabla de cuentas de usuario
CREATE TABLE cuentas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    rol ENUM('administrador', 'invitado', 'gelato') NOT NULL DEFAULT 'invitado',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);

-- Insertar cuentas de ejemplo
INSERT INTO cuentas (nombre_usuario, contrasena, correo, rol, estado)
VALUES 
('admin', 'admin123', 'admin@agroeco.com', 'administrador', 'activo'),
('invitado', 'invitado123', 'raficoplay@gmail.com', 'invitado', 'activo'),
('gelato', 'gelato123', 'raficoplay@gmail.com', 'gelato', 'activo');

-- Tabla de organismos 
CREATE TABLE organismos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_comun VARCHAR(100) NOT NULL,
    nombre_cientifico VARCHAR(150),
    tipo VARCHAR(50),
    fecha_ingreso DATE NOT NULL,
    ubicacion VARCHAR(100),
    estado ENUM('germinacion', 'plantula', 'planta', 'floracion', 'muerto') DEFAULT 'germinacion'
);


-- Tabla de registro de acciones
CREATE TABLE registro_acciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cuenta INT,
    accion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cuenta) REFERENCES cuentas(id) ON DELETE SET NULL
);

-- Tabla de permisos por rol
CREATE TABLE permisos (
    rol ENUM('administrador', 'invitado', 'gelato') PRIMARY KEY,
    puede_ver BOOLEAN DEFAULT FALSE,
    puede_agregar BOOLEAN DEFAULT FALSE,
    puede_modificar BOOLEAN DEFAULT FALSE,
    puede_eliminar BOOLEAN DEFAULT FALSE,
    puede_ver_acciones BOOLEAN DEFAULT FALSE,
    puede_gestionar_cuentas BOOLEAN DEFAULT FALSE
);

-- Insertar permisos por rol
INSERT INTO permisos VALUES 
('invitado', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
('administrador', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
('gelato', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- Comandos de consulta útiles
-- Mostrar todas las tablas
SHOW TABLES ;

-- Ver columnas de la tabla cuentas
SHOW COLUMNS FROM organismos;

-- Ver todas las cuentas
SELECT * FROM organismos;


-- Ver usuarios gelato
SELECT * FROM cuentas WHERE rol = 'gelato';

-- Ver roles existentes
SELECT DISTINCT rol FROM cuentas;

-- Ver organismos y sus estados
SELECT id, nombre_comun, estado FROM organismos;

-- Contar organismos por estado
SELECT estado, COUNT(*) AS cantidad FROM organismos GROUP BY estado;

-- Actualizar estado de un organismo (ejemplo)
UPDATE organismos SET estado = 'plantula' WHERE id = 1;

-- Ver permisos por rol
SELECT * FROM permisos WHERE rol = 'Gelato' ;



