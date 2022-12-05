const express = require("express");
const { propertyController } = require("../controller");
const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.post(
  "/post",
  fileUploader({
    destinationFolder: "post",
    fileType: "image",
    prefix: "POST",
  }).single("picture"),
  propertyController.addProperty
);
routers.patch("/edit", propertyController.editProperty);

module.exports = routers;
