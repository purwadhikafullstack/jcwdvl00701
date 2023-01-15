const express = require("express");
const { propertyController } = require("../controller");
const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.post(
  "/post",
  fileUploader({
    destinationFolder: "property",
    fileType: "image",
    prefix: "PROPERTY",
  }).single("pic"),
  propertyController.addProperty
);
routers.post("/delete", propertyController.deleteProperty);

routers.patch(
  "/edit",
  fileUploader({
    destinationFolder: "property",
    fileType: "image",
    prefix: "PROPERTY",
  }).single("pic"),
  propertyController.editProperty
);

routers.get("/all", propertyController.getAll);
routers.get("/search", propertyController.getSearchResult);
routers.get("/seeders", propertyController.getSeeders);
routers.get("/get/edit/:propertyId", propertyController.getOneProperty);
routers.get("/get/:tenantId", propertyController.getPropertyFilter);

module.exports = routers;
