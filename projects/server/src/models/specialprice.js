'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class SpecialPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room)
    }
  }
  SpecialPrice.init({
    type : {
      type : DataTypes.STRING,
      allowNull : false,
      default: 'nominal'
    },
    discount : {
      type : DataTypes.INTEGER,
      allowNull : false,
      default: 0
    },
    startDate : {
      type : DataTypes.DATE,
      allowNull : false,
    },
    endDate : {
      type : DataTypes.DATE,
      allowNull : false,
    },
    roomId : {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
  }, {
    sequelize,
    modelName: 'SpecialPrice',
  });
  return SpecialPrice;
};