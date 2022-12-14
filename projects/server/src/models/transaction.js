'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Reservation)
    }
  }
  Transaction.init({
    paymentProof : {
      type : DataTypes.STRING,
    },
    reservationId : {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};