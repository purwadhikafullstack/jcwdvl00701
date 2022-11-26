'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Bank)
      this.hasMany(models.Property)
    }
  }
  Tenant.init({
    name : {
      type : DataTypes.STRING,
    },
    email :  {
      type : DataTypes.STRING,
      unique : true
    },
    password : {
      type : DataTypes.STRING,
    },
    phone_number : {
      type : DataTypes.STRING,
    },
    id_card_picture : {
      type : DataTypes.STRING,
    },
    bank_account_number : {
      type : DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Tenant',
  });
  return Tenant;
};