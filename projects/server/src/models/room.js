"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Property);
      this.hasMany(models.SpecialPrice);
      this.hasMany(models.RoomUnavailability);
      this.hasMany(models.Reservation);
    }
  }
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defaultPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
