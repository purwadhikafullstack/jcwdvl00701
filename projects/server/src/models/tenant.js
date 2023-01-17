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
      this.belongsTo(models.User)
      this.belongsTo(models.Bank)
      this.hasMany(models.Property)
    }
  }
  Tenant.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    idCardPic: {
      type: DataTypes.STRING,
    },
    bankAccountNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Tenant',
  });
  return Tenant;
};