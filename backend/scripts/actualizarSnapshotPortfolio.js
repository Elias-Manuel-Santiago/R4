import connection from "../modules/db.js";
import { actualizarSnapshotPortfolio, snapshotPath } from "../modules/portfolioSnapshot.js";

try {
  await actualizarSnapshotPortfolio();
  console.log(`Snapshot del portafolio actualizado en ${snapshotPath}`);
} finally {
  // Este script termina tras generar el archivo; no debe mantener vivo el build.
  await connection.end();
}
