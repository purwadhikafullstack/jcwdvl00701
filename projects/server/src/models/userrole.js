'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
      this.belongsTo(models.Role)
    }
  }
  UserRole.init({
    userId : {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};