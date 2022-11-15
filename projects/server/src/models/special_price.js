const {DataTypes} = require("sequelize")

const SpecialPrice = (sequelize) => {
    return sequelize.define("SpecialPrice" , {
        type : {
            type : DataTypes.STRING,
            allowNull : false
        },
        discount : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
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

module.exports = SpecialPrice