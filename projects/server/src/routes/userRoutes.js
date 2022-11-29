const express = require("express")
const {userController} = require("../controller")
const routers = express.Router()

routers.get("/get", userController.getUser)
routers.post("/update", userController.patchUser)

module.exports = routers