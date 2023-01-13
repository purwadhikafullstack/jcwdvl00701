const userRouters = require("./userRouters");
const roomRouters = require("./roomRouters");
const specialPriceRouters = require("./specialPriceRouters")
const propertyRouters = require("./propertyRouters");
const tenantRouters = require("./tenantRouters");
const productRoutrs = require("./productRouters");
const reportRouters = require("./reportRouters");
const reservationRouters = require("./reservationRouters")
const paymentRouters = require("./paymentRouters")
const historyRouters = require("./historyRouters")
const roomUnavailabilityRouters = require("./roomUnavailabilityRouters")

module.exports = {
  userRouters,
  roomRouters,
  propertyRouters,
  tenantRouters,
  productRoutrs,
  reportRouters,
  tenantRouters,
  reservationRouters,
  paymentRouters,
  historyRouters,
  specialPriceRouters,
  roomUnavailabilityRouters
};

