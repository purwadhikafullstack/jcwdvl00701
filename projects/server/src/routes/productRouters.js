const express = require("express");
const { productController } = require("../controller");
const routers = express.Router();

routers.get("/get/:id", productController.getProductDetail);
module.exports = routers;
