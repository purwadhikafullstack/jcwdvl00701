"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tenant);
      this.belongsTo(models.Category);
      this.hasMany(models.Room);
    }
  }
  Property.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pic: {
        type: DataTypes.STRING,
      },
      rules: {
        type: DataTypes.STRING,
      },
      tenantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      deletedAt : {
        type : DataTypes.DATE
      },
      price: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return this.Rooms?.reduce((lowestPrice, room) => room.activePrice < lowestPrice ? room.activePrice : lowestPrice, Infinity)
        }
      },
      defaultPrice: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return this.Rooms?.reduce((lowestPrice, room) => room.defaultPrice < lowestPrice ? room.defaultPrice : lowestPrice, Infinity)
        }
      },
      maxCapacity: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return this.Rooms?.reduce((highestCapacity, room) => room.capacity > highestCapacity ? room.capacity : highestCapacity, -Infinity)
        }
      }
    },
    {
      paranoid : true,
      sequelize,
      modelName: "Property",
    },
  );
  return Property;
};
