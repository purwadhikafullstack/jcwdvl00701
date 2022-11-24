'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Property)
      this.hasMany(models.Reservation)
      this.hasMany(models.SpecialPrice)
      this.hasMany(models.RoomUnavailability)
    }
  }
  Room.init({
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    defaultPrice : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    description : {
      type : DataTypes.TEXT,
    },
    categoryId : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};