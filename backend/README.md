# Backend del portfolio

1. Ejecutar `database/portfolio.sql` en la misma base de datos configurada en `modules/db.js`.
2. Instalar dependencias con `npm install`.
3. Iniciar la API con `npm start` (por defecto en el puerto `10001`).

La API expone `GET /api/portfolio` y las rutas de edición `POST/PUT/DELETE /api/items` y `PUT /api/profile`. El modo administrador todavía no posee autenticación: es una etapa posterior del proyecto.

Cada edición regenera `../frontend/src/data/portfolioSnapshot.json`, que Vite integra en la primera carga del sitio. Para sincronizarlo manualmente antes de publicar el frontend, ejecutar `npm run cache:portfolio`.

## Acceso administrador

Configurá estos secretos en el servicio backend de Render (no los subas al repositorio):

- `ADMIN_PASSWORD`: una contraseña única y larga para entrar al panel.

El backend no habilita las rutas de edición si falta ese valor. La contraseña se valida en el servidor cada vez que se guarda o elimina contenido, y nunca se persiste en el navegador.
