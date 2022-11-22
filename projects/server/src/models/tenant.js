const {DataTypes} = require("sequelize")

const Tenant = (sequelize) => {
    return sequelize.define("Tenant", {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email :  {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        phone_number : {
            type : DataTypes.STRING,
            allowNull :false
        },
        id_card_picture : {
            type : DataTypes.STRING,
            allowNull :false
        },
        bank_account_number : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
}

module.exports = Tenant