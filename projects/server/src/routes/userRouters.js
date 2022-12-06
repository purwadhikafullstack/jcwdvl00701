const express = require("express")
const {userController} = require("../controller")
const fileUploader = require("../lib/uploader");

const routers = express.Router()

routers.post("/register", userController.addUser)
routers.get("/get", userController.getUser)
routers.get("/login", userController.getUserOne)
routers.patch("/verifiedAccount", userController.verificationUser)
routers.get("/getById", userController.getUserById)
routers.post("/update", userController.patchUser)
routers.post("/profilePic", fileUploader({
    destinationFolder: "profile_pic",
    fileType: "image",
    prefix: "POST",
}).single("image"), userController.updateUserProfilePic)


module.exports = routers