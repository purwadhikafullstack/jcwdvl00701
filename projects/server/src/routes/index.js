const userRouters = require("./userRouters")
const specialPriceRouters = require("./specialPriceRouters")
const roomRouters = require("./roomRouters")
const propertyRouters = require("./propertyRouters");
const tenantRouters = require("./tenantRouters")
const roomUnavailabilityRouters = require("./roomUnavailabilityRouters")

module.exports = {
    userRouters,
    roomRouters,
    tenantRouters,
    specialPriceRouters,
    propertyRouters,
    roomUnavailabilityRouters
}
