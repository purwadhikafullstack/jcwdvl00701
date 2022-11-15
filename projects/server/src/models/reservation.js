const {DataTypes} = require("sequelize") 

const Reservation = (sequelize) => {
    return sequelize.define("Reservation", {
        start_date : {
            type : DataTypes.DATE,
            allowNull : false
        },
        end_date : {
            type : DataTypes.DATE,
            allowNull : false
        },
        status : {
            type : DataTypes.SMALLINT,
            allowNull : false
        },
        guest_count : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    })
}

module.exports = Reservation