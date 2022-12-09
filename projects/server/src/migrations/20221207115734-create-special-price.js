'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpecialPrices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpecialPrices');
  }
};