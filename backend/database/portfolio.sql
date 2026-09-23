-- Ejecutar este archivo una vez dentro de la base de datos MariaDB/MySQL configurada en modules/db.js.
-- No borra la tabla skills existente ni ningún dato previo.

CREATE TABLE IF NOT EXISTS portfolio_profile (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(120) NOT NULL,
  intro TEXT NOT NULL,
  email VARCHAR(150) NOT NULL,
  telefono VARCHAR(40) NOT NULL DEFAULT '',
  location VARCHAR(120) NOT NULL DEFAULT '',
  availability VARCHAR(150) NOT NULL DEFAULT '',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS portfolio_items (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  section ENUM('skills', 'experience', 'achievement', 'project') NOT NULL,
  title VARCHAR(150) NOT NULL,
  subtitle VARCHAR(180) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  date_label VARCHAR(120) NOT NULL DEFAULT '',
  tags JSON NOT NULL,
  link VARCHAR(500) NOT NULL DEFAULT '',
  image_url VARCHAR(500) NOT NULL DEFAULT '',
  display_order SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX portfolio_items_order (section, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos de arranque: se insertan una sola vez y luego se editan desde el modo administrador.
INSERT IGNORE INTO portfolio_profile (id, name, role, intro, email, telefono, location, availability)
VALUES (1, 'Ana Martínez', 'Desarrolladora Frontend', 'Diseño interfaces claras, accesibles y con personalidad para transformar ideas en experiencias digitales.', 'ana.martinez@email.com', '+54 11 5555-0100', 'Buenos Aires, Argentina', 'Disponible para nuevos proyectos');

INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order)
SELECT 'skills', 'React', 'Interfaces', 'Componentes reutilizables, estado y eventos.', '', JSON_ARRAY('Hooks', 'JSX'), '', '', 1
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items);

INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order)
SELECT 'skills', 'TypeScript', 'Código claro', 'Tipos que hacen el código más fácil de mantener.', '', JSON_ARRAY('Tipos', 'Vite'), '', '', 2
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items WHERE title = 'TypeScript' AND section = 'skills');

INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order)
SELECT 'skills', 'CSS', 'Diseño', 'Diseños responsivos con una identidad visual definida.', '', JSON_ARRAY('Responsive', 'UI'), '', '', 3
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items WHERE title = 'CSS' AND section = 'skills');

INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order)
SELECT 'experience', 'Desarrolladora Frontend', 'Estudio Pixel', 'Construcción de sitios responsive y colaboración con diseño.', '2024 — actualidad', JSON_ARRAY('React', 'CSS'), '', '', 1
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items WHERE title = 'Desarrolladora Frontend' AND section = 'experience');

INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order)
SELECT 'achievement', 'Mejor proyecto integrador', 'Bootcamp Web', 'Reconocimiento por una aplicación de organización de tareas.', '2024', JSON_ARRAY('UI', 'Equipo'), '', '', 2
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items WHERE title = 'Mejor proyecto integrador' AND section = 'achievement');

INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order)
SELECT 'project', 'Organizá', 'App de tareas', 'Aplicación para planificar tareas con filtros, tema claro y oscuro.', 'React + TypeScript', JSON_ARRAY('React', 'LocalStorage'), 'https://github.com/', '', 1
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items WHERE title = 'Organizá' AND section = 'project');

INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order)
SELECT 'project', 'Café Central', 'Landing page', 'Sitio de presentación para una cafetería local, pensado primero para móvil.', 'HTML + CSS', JSON_ARRAY('Responsive', 'UX'), 'https://github.com/', '', 2
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items WHERE title = 'Café Central' AND section = 'project');
