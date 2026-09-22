import mysql from "mysql2/promise";

// Conexión basada en promesas para poder esperar consultas con await.
const connection = await mysql.createConnection({
  host: "sql.freedb.tech",
  user: "u_URa19Z",
  password: "rAPKKguSEek1",
  database: "freedb_DtTMRjoI",
});

export default connection;
