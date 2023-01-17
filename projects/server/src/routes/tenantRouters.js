const express = require("express");
const { tenantController } = require("../controller");
const fileUploader = require("../lib/uploader");

const routers = express.Router();

routers.post(
  "/complete-register",
  fileUploader({
    destinationFolder: "tenant",
    fileType: "image",
    prefix: "TENANT",
  }).single("idCardPic"),
  tenantController.addTenantComplete
);

routers.post(
  "/register-tenant",
  fileUploader({
    destinationFolder: "tenant",
    fileType: "image",
    prefix: "TENANT",
  }).single("idCardPic"),
  tenantController.addTenantRegister
);

routers.get("/get-tenant", tenantController.getTenantById);
routers.get("/dropdown-bank", tenantController.getBankDropdown)
routers.post("/update", tenantController.patchTenant)

module.exports = routers;
