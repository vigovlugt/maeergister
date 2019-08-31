import mysql from "mysql2/promise";

let connection: mysql.Connection;

export default async function getConnection() {
  if (connection) return connection;
  connection = await mysql.createConnection({
    host: "maeergister.cobuwfghkcfg.eu-central-1.rds.amazonaws.com",
    user: "admin",
    password: "trwwUWVI3wJEu9ZlRcAL",
    database: "Maeergister"
  });
  return connection;
}

export async function getTable(table: string) {
  const con = await getConnection();
  return await con.query("select * from " + table)[0];
}

getConnection();
