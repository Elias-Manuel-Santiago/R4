import mysql from "mysql2/promise";

// La versión basada en promesas permite usar await en las consultas del repositorio.
const connection = await mysql.createConnection({
  host: "sql.freedb.tech",
  user: "u_URa19Z",
  password: "rAPKKguSEek1",
  database: "freedb_DtTMRjoI",
});

export default connection;
