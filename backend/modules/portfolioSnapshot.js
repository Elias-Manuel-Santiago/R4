import { randomUUID } from "node:crypto";
import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listarPortfolio } from "./consultas.js";

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
// Se guarda dentro de src para que Vite lo incluya en el bundle inicial del sitio.
const snapshotPath = path.resolve(
  moduleDirectory,
  "../../frontend/src/data/portfolioSnapshot.json",
);

/**
 * Genera de forma atómica el contenido que el frontend muestra antes de consultar
 * la API. Se puede ejecutar tras cada edición o manualmente antes de desplegar.
 */
export async function actualizarSnapshotPortfolio() {
  const portfolio = await listarPortfolio();
  const temporaryPath = `${snapshotPath}.${randomUUID()}.tmp`;

  await mkdir(path.dirname(snapshotPath), { recursive: true });
  await writeFile(temporaryPath, `${JSON.stringify(portfolio, null, 2)}\n`, "utf8");
  await rename(temporaryPath, snapshotPath);

  return portfolio;
}

export { snapshotPath };
