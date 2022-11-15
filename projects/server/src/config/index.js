const path = require("path");
require('dotenv').config({path:path.resolve(__dirname, '../configs/.env')})

module.exports = {
    env: process.env
}