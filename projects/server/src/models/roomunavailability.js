'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class RoomUnavailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room)
    }
  }
  RoomUnavailability.init({
    startDate : {
      type : DataTypes.DATE,
      allowNull : false,
    },
    endDate : {
      type : DataTypes.DATE,
      allowNull : false,
    },
    roomId : {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
  }, {
    sequelize,
    modelName: 'RoomUnavailability',
  });
  return RoomUnavailability;
};