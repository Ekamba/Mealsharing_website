// Inspiration taken from https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4

const mysql = require("mysql2");

require("dotenv").config();
//==== database configuration
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "secret1984",
  database: "onlinebook",
  port: 3306,
  multipleStatements: true,
  insecureAuth: true,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  console.log("Mysql Connected...");
  //if (connection) connection.release();
  //return;
});

module.exports = pool;
