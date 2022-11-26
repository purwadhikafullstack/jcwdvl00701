'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Transaction)
      this.hasOne(models.Review)
      this.belongsTo(models.Room)
      this.belongsTo(models.User)
    }
  }
  Reservation.init({
    startDate : {
      type : DataTypes.DATE,
      allowNull : false
    },
    endDate : {
      type : DataTypes.DATE,
      allowNull : false
    },
    status : {
      type : DataTypes.SMALLINT,
      allowNull : false
    },
    guestCount : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    userId : {
      type: DataTypes.STRING,
      allowNull: false
    },
    roomId : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};