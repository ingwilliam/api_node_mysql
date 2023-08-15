-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS api_mysql;
USE api_mysql;

-- Crear un usuario con privilegios
CREATE USER 'ejecutar'@'%' IDENTIFIED BY '123456789';
GRANT ALL PRIVILEGES ON api_mysql.* TO 'ejecutar'@'%';

CREATE TABLE IF NOT EXISTS usuarios (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text,
  `correo` text,
  `password` text,
  `estado` tinyint(1) NOT NULL DEFAULT '0',
  `autenticacion` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS roles (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text,
  `estado` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS usuarios_roles (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (usuarioId) REFERENCES usuarios (id),
  FOREIGN KEY (roleId) REFERENCES roles (id)
);