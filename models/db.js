const mysql = require("mysql2");
const fs = require("fs");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  ssl: {
    ca: fs.readFileSync("./ca.pem"),
    rejectUnauthorized: false,
  },
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MYSQL Connected! @ " + process.env.PORT);
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB}`,
    function (err, result) {
      if (err) throw err;
      console.log(process.env.DB + "- Database created.");
    }
  );
  connection.query(`USE ${process.env.DB}`, () => {
    console.log(`Now using ${process.env.DB}`);
  });
});
module.exports = connection;
