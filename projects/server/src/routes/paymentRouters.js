const express = require("express")
const {paymentController} = require("../controller")
const fileUploader = require("../lib/uploader")

const routers = express.Router()

routers.get("/get-payment", paymentController.getPayment)
routers.post("/add-payment", fileUploader({
    destinationFolder : "payment",
    fileType : "image",
    prefix : "POST",
}).single("image"),paymentController.addPayment)

module.exports = routers