const express = require("express")
const {reservationController} = require("../controller")

const routers = express.Router()

routers.get("/get-reservation", reservationController.getReservation)
routers.post("/add-reservation", reservationController.addReservation)

module.exports = routers