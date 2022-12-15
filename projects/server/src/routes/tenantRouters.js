const express = require("express")
const {tenantController} = require("../controller")

const routers = express.Router()

routers.post("/complete-register" , tenantController.addTenantComplete)
routers.post("/register-tenant", tenantController.addTenantRegister)

module.exports = routers