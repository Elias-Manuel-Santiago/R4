import express from "express";
import cors from "cors";
import {
  actualizarItem,
  actualizarPerfil,
  crearItem,
  eliminarItem,
  listarPortfolio,
  listarSkills,
} from "./modules/consultas.js";

// Instancia de Express que recibe las solicitudes HTTP del frontend.
const app = express();
const port = process.env.PORT || 10001;

// CORS permite al frontend alojado en otro origen consultar esta API.
app.use(cors());
app.use(express.json());

// Evita repetir try/catch en cada ruta asíncrona de la API.
const asyncRoute = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

// Se conserva esta ruta para no romper el ejemplo inicial ni clientes anteriores.
// Ruta antigua mantenida para los clientes que todavía consumen solo habilidades.
app.post(
  "/api/listado",
  asyncRoute(async (_req, res) => {
    res.json(await listarSkills());
  }),
);

// Entrega el perfil y todos los materiales que forman el portafolio.
app.post(
  "/api/portfolio",
  asyncRoute(async (_req, res) => {
    res.json(await listarPortfolio());
  }),
);

// Crea un material y responde con el registro, incluido el id asignado por la base.
app.post(
  "/api/items",
  asyncRoute(async (req, res) => {
    const item = await crearItem(req.body);
    res.status(201).json(item);
  }),
);

// Reemplaza los datos editables de un material existente.
app.put(
  "/api/items/:id",
  asyncRoute(async (req, res) => {
    const item = await actualizarItem(Number(req.params.id), req.body);
    res.json(item);
  }),
);

// Borra un material y responde 204 porque no hay contenido que devolver.
app.delete(
  "/api/items/:id",
  asyncRoute(async (req, res) => {
    await eliminarItem(Number(req.params.id));
    res.sendStatus(204);
  }),
);

// Guarda los datos de presentación de la persona dueña del portafolio.
app.put(
  "/api/profile",
  asyncRoute(async (req, res) => {
    res.json(await actualizarPerfil(req.body));
  }),
);

// Última capa: convierte errores internos o de validación en una respuesta JSON segura.
app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error.status ?? 500;
  res.status(status).json({
    message:
      status === 500
        ? "Ocurrió un error al acceder a los datos."
        : error.message,
  });
});

app.listen(port, () =>
  console.log(`API escuchando en http://localhost:${port}`),
);
