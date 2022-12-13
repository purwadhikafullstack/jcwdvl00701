'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserRole)
      this.hasOne(models.Profile)
      this.hasOne(models.Tenant)
      this.hasMany(models.Reservation)
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    firebaseProviderId: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};