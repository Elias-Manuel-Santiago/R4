import connection from "./db.js"

export async function listarSkills(){
    const [respuesta] = await connection.query("SELECT id, titulo, descripcion FROM skills"); 
    return respuesta;
}