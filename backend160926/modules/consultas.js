import connection from "./db.js";

/** Lee las habilidades de la estructura de base de datos de la versión anterior. */
export async function listarSkills() {
  const [respuesta] = await connection.query(
    "SELECT id, titulo, descripcion FROM skills",
  );
  return respuesta;
}
