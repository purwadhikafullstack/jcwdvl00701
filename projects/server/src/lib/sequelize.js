const {env} = require("../config")
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize({
    username : env.MYSQL_USER,
    password : env.MYSQL_PASSWORD,
    database : env.MYSQL_DB_NAME,
    port : env.MYSQL_PORT,
    dialect : 'mysql'
})

const User = require("../models/user")(sequelize)
const Verification = require("../models/verification")(sequelize)
const Reservation = require("../models/reservation")(sequelize)
const Transaction = require("../models/transaction")(sequelize)
const Room = require("../models/room")(sequelize)
const SpecialPrice = require("../models/special_price")(sequelize)
const Review = require("../models/review")(sequelize)
const Property = require("../models/property")(sequelize)
const Tenant = require("../models/tenant")(sequelize)
const Category = require("../models/category")(sequelize)
const Bank = require("../models/bank")(sequelize)
const RoomUnavailability = require("../models/room_unavailability")(sequelize)

User.hasMany(Verification)
Verification.belongsTo(User)

User.hasMany(Reservation)
Reservation.belongsTo(User)

Reservation.hasOne(Transaction)
Transaction.belongsTo(Reservation)

Reservation.hasOne(Review)
Review.belongsTo(Reservation)

Bank.hasMany(Tenant)
Tenant.belongsTo(Bank)

Tenant.hasMany(Property)
Property.belongsTo(Tenant)

Category.hasMany(Property)
Property.belongsTo(Category)

Property.hasMany(Room)
Room.belongsTo(Property)

Room.hasMany(Reservation)
Reservation.belongsTo(Room)

Room.hasMany(SpecialPrice)
SpecialPrice.belongsTo(Room)

Room.hasMany(RoomUnavailability)
RoomUnavailability.belongsTo(Room)

module.exports = {
    sequelize,
    User,
    Verification,
    Reservation,
    Transaction,
    Room,
    SpecialPrice,
    Review,
    Property,
    Tenant,
    Category,
    Bank
}