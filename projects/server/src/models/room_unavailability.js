 const {DataTypes} = require("sequelize")

const RoomUnavailabilty = (sequelize) => {
    return sequelize.define("RoomUnavailabilty" , {
        start_date : {
            type : DataTypes.DATE,
            allowNull : false
        },
        end_date : {
            type : DataTypes.DATE,
            allowNull : false
        }
    })
}

module.exports = RoomUnavailabilty