const express = require("express");
const { reportController } = require("../controller");
const routers = express.Router();

routers.get("/get/:tenantId", reportController.getOrder);
routers.patch("/update/:id", reportController.updateOrder);
routers.get("/get/sales-report/:tenantId", reportController.getSalesReport);
routers.post("/email-order", reportController.emailOrder)

module.exports = routers;
