'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Property)
    }
  }
  Category.init({
    location : {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};