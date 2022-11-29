const path = require("path");
require('dotenv').config({path:path.resolve(__dirname, '../config/.env')})

// console.log(process.env);
module.exports = {
    env: process.env
}