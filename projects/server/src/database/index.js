const { env } = require("../config");
const mysql = require("mysql2");
const util = require("util");

const db = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  multipleStatements: true,
});

db.getConnection((err) => {
  if (err) {
    return console.error(`error : ${err.message}`);
  }
  console.log(`Connected to mySql server`);
});

const dbQuery = util.promisify(db.query).bind(db);
module.exports = { db, dbQuery };
