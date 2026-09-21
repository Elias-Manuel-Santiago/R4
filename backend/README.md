# Backend del portfolio

1. Ejecutar `database/portfolio.sql` en la misma base de datos configurada en `modules/db.js`.
2. Instalar dependencias con `npm install`.
3. Iniciar la API con `npm start` (por defecto en el puerto `10001`).

La API expone `GET /api/portfolio` y las rutas de edición `POST/PUT/DELETE /api/items` y `PUT /api/profile`. El modo administrador todavía no posee autenticación: es una etapa posterior del proyecto.
