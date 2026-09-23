# Frontend del portfolio

1. Iniciar el backend desde `../backend` con `npm start`.
2. Ejecutar `npm install` y `npm run dev` en esta carpeta.

Vite redirige las solicitudes `/api` al backend local. Para producción, crear un archivo `.env` con `VITE_API_URL=https://tu-api/api`.

`src/data/portfolioSnapshot.json` es la copia local que se muestra inmediatamente al entrar. El backend la actualiza tras cada edición y también al iniciarse; si se necesita actualizarla antes de compilar o desplegar el frontend, ejecutar `npm run cache:portfolio` desde `backend`.

El pequeño punto en el extremo inferior derecho del pie abre el modo administrador. Por ahora es un acceso de edición temporal y no reemplaza un sistema de autenticación.
