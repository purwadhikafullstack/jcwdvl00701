const {DataTypes} = require("sequelize")

const Room = (sequelize) => {
    return sequelize.define("Room" , {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        default_price : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        }
    })
}

module.exports = Room