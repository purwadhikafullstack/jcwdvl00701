'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class SpecialPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room)
    }
  }
  SpecialPrice.init({
    type : {
      type : DataTypes.STRING,
      allowNull : false,
      default: 'nominal'
    },
    discount : {
      type : DataTypes.INTEGER,
      allowNull : false,
      default: 0
    },
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
    isActive : {
      type: DataTypes.VIRTUAL,
      get() {
        return this.startDate <= new Date() && this.endDate >= new Date()
      },
      set() {
        throw new Error('Cannot set derived attribute')
      }
    },
    price : {
      type: DataTypes.VIRTUAL,
      get() {
        const room = this.Room
        if (room) {
          return this.type === 'nominal' ? this.Room.get().defaultPrice - this.discount : this.Room.get().defaultPrice * (100 + this.discount) / 100
        } else {
          return 0
        }
      },
      set() {
        throw new Error('Cannot set derived attribute')
      }
    }
  }, {
    sequelize,
    modelName: 'SpecialPrice',
  });
  return SpecialPrice;
};