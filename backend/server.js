import express from 'express'
import cors from 'cors'
import {
  actualizarItem,
  actualizarPerfil,
  crearItem,
  eliminarItem,
  listarPortfolio,
  listarSkills,
} from './modules/consultas.js'

const app = express()
const port = process.env.PORT || 10001

app.use(cors())
app.use(express.json())

// Evita repetir try/catch en cada ruta asíncrona de la API.
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next)

// Se conserva esta ruta para no romper el ejemplo inicial ni clientes anteriores.
app.post('/api/listado', asyncRoute(async (_req, res) => {
  res.json(await listarSkills())
}))

app.get('/api/portfolio', asyncRoute(async (_req, res) => {
  res.json(await listarPortfolio())
}))

app.post('/api/items', asyncRoute(async (req, res) => {
  const item = await crearItem(req.body)
  res.status(201).json(item)
}))

app.put('/api/items/:id', asyncRoute(async (req, res) => {
  const item = await actualizarItem(Number(req.params.id), req.body)
  res.json(item)
}))

app.delete('/api/items/:id', asyncRoute(async (req, res) => {
  await eliminarItem(Number(req.params.id))
  res.sendStatus(204)
}))

app.put('/api/profile', asyncRoute(async (req, res) => {
  res.json(await actualizarPerfil(req.body))
}))

app.use((error, _req, res, _next) => {
  console.error(error)
  const status = error.status ?? 500
  res.status(status).json({ message: status === 500 ? 'Ocurrió un error al acceder a los datos.' : error.message })
})

app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`))
