'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Room)
      this.belongsTo(models.Tenant)
      this.hasMany(models.Room)
    }
  }
  Property.init({
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
    },
    tenantId : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId : {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};