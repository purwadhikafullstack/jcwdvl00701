const express = require("express")
const {userController} = require("../controller")
const routers = express.Router()

routers.post("/register", userController.addUser)
routers.get("/get", userController.getUser)
routers.get("/login", userController.getUserOne)
routers.patch("/verifiedAccount", userController.verificationUser)
routers.get("/getById", userController.getUserById)
routers.post("/update", userController.patchUser)

module.exports = routers