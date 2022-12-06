'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class SpecialPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room)
    }
  }
  SpecialPrice.init({
    type : {
      type : DataTypes.STRING,
      allowNull : false
    },
    discount : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    startDate : {
      type : DataTypes.DATE,
      allowNull : false
    },
    endDate : {
      type : DataTypes.DATE,
      allowNull : false
    },
    roomId : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SpecialPrice',
  });
  return SpecialPrice;
};