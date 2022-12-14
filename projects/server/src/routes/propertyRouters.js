const express = require("express")
const {propertyController:controller} = require('../controller')

const routers = express.Router()

// routers.post('/add', controller.add)
routers.get('/all', controller.getAll)
// routers.get('/get', controller.get)
// routers.post('/update', controller.update)
// routers.post('/delete', controller.delete)

module.exports = routers