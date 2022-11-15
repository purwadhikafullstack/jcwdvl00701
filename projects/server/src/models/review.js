const {DataTypes} = require("sequelize")

const Review = (sequelize) => {
    return sequelize.define("Review", {
        comment : {
            type : DataTypes.TEXT,
            allowNull : false
        }
    })
}

module.exports = Review