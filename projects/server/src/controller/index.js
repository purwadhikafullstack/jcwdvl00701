const userController = require("./userController");
const roomController = require("./roomController");
const propertyController = require("./propertyController");
const tenantController = require("./tenantController");
const productController = require("./productController");
const reportController = require("./reportConstroller");
const reservationController = require("./reservationController")
const paymentController = require("./paymentController")
const historyController = require("./historyController")
const roomUnavailabilityController = require("./roomUnavailabilityController")
const specialPriceController = require("./specialPriceController")

module.exports = {
  userController,
  roomController,
  propertyController,
  tenantController,
  productController,
  reportController,
  reservationController,
  paymentController,
  historyController,
  roomUnavailabilityController,
  specialPriceController,
};
