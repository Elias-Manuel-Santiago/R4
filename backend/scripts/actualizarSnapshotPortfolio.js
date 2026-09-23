import { actualizarSnapshotPortfolio, snapshotPath } from "../modules/portfolioSnapshot.js";

await actualizarSnapshotPortfolio();
console.log(`Snapshot del portafolio actualizado en ${snapshotPath}`);
