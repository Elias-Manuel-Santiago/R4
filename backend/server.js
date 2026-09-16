import express from "express";
import { listarSkills } from "./modules/consultas.js";

const app = express();
const port = 10001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
app.use(express.json());

app.post("/api/listado", async (req, res) => {
    const resultados = await listarSkills();
    res.status(200).json(resultados);
});


app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
