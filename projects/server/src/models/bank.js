const {DataTypes} = require("sequelize")

const Bank = (sequelize) => {
    return sequelize.define("Bank", {
        name : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    })
}

module.exports = Bank