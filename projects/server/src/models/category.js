const {DataTypes} = require("sequelize")

const Category = (sequelize) => {
    return sequelize.define("Category", {
        location : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
}

module.exports = Category