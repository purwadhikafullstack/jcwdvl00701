const {env} = require("../config")
const mysql = require("mysql2")
const util = require("util")

const db = mysql.createPool({
    host: env.DB_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DB_NAME,
    port: env.MYSQL_PORT,
    multipleStatements: true 
});

db.getConnection((err) => {
    if(err) {
        return console.error(`error : ${err.message}`)
    }
    console.log(`Connected to mySql server`);
})

const dbQuery = util.promisify(db.query).bind(db);
module.exports = { db, dbQuery };