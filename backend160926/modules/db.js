import mysql from "mysql2/promise";


const connection = await mysql.createConnection({
  host: "sql.freedb.tech",
  user: "u_URa19Z",
  password: "rAPKKguSEek1",
  database: "freedb_DtTMRjoI",
});

export default connection;
