'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Reservation)
    }
  }
  Review.init({
    comment : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    reservationId : {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};