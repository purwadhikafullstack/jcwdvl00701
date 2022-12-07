'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tenant)
      this.belongsTo(models.Category)
      this.hasMany(models.Room)
    }
  }
  Property.init({
    name : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    description : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    pic : {
      type : DataTypes.STRING,
    },
    rules : {
      type : DataTypes.STRING,
    },
    tenantId : {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    categoryId : {
      type : DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};