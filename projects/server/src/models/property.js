const {DataTypes} = require("sequelize")

const Property = (sequelize) => {
    return sequelize.define("Property", {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        picture : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        rules : {
            type : DataTypes.TEXT,
            allowNull : false
        }
    })
}

module.exports = Property