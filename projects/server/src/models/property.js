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
<<<<<<< HEAD
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
=======
      this.hasMany(models.Room);
      this.belongsTo(models.Tenant);
      this.hasOne(models.Category);
    }
  }
  Property.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      picture: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rules: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tenantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
>>>>>>> 03e8f65 (feat add property)
  return Property;
};
