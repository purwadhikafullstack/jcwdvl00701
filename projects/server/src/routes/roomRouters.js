const express = require("express");
const { roomController } = require("../controller");
const routers = express.Router();

routers.get("/get-room", roomController.getRoom);
routers.post("/add-room", roomController.addRoom);
routers.patch("/update-room/:id", roomController.updateRoom);
routers.post("/delete-room", roomController.deleteRoom);
routers.get("/room-property/:id", roomController.getRoomProperty);
routers.get("/room-one/:id", roomController.getRoomOne);
routers.get("/room-dropdown/:tenantId", roomController.getPropertyDropdown);

module.exports = routers;
