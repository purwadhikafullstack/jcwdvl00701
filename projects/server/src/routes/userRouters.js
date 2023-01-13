const express = require("express")
const {userController} = require("../controller")
const fileUploader = require("../lib/uploader");

const routers = express.Router()

routers.post("/register", userController.addUser)
routers.get("/all", userController.getUserAll)
routers.get("/get", userController.getUser)
routers.get("/get-by-id", userController.getUserById)
routers.patch("/verifiedAccount", userController.verificationUser)
routers.post("/update", userController.patchUser)
routers.post("/profilePic", fileUploader({
    destinationFolder: "profile_pic",
    fileType: "image",
    prefix: "POST",
}).single("image"), userController.updateUserProfilePic)
routers.get("/redux-user", userController.userRedux)
routers.post("/complete-user", userController.completeDataUser)


module.exports = routers