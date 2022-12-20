const express = require("express");
const { reportController } = require("../controller");
const routers = express.Router();

routers.get("/get", reportController.getOrder);

module.exports = routers;
