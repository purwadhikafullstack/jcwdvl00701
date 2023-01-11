const express = require("express");
const { productController } = require("../controller");
const routers = express.Router();

routers.get("/get/:id", productController.getProductDetail);
routers.get("/get/review/:id", productController.getReview);
routers.get("/get/room/:id", productController.getRoom);
module.exports = routers;
