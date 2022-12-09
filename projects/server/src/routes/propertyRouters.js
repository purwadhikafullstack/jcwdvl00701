const express = require("express");
const { propertyController } = require("../controller");
const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.post(
  "/post",
  fileUploader({
    destinationFolder: "property",
    fileType: "image",
    prefix: "/PROPERTY",
  }).single("picture"),
  propertyController.addProperty
);
routers.patch("/edit", propertyController.editProperty);

routers.get("/get/:tenantId", propertyController.getPropertyFilter);
routers.get("/get/edit/:propertyId", propertyController.getOneProperty);
routers.post("/delete", propertyController.deleteProperty);

routers.get("/seeders", propertyController.getSeeders);
module.exports = routers;
