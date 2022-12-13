const { env } = require("../config");
const mysql = require("mysql2");
const util = require("util");

const db = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
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
