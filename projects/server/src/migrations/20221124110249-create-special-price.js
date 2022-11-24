'use strict';
const {Sequelize} = require("sequelize");
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
        type : Sequelize.STRING,
        allowNull : false
      },
      discount : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      startDate : {
        type : Sequelize.DATE,
        allowNull : false
      },
      endDate : {
        type : Sequelize.DATE,
        allowNull : false
      },
      roomId : {
        type: Sequelize.INTEGER,
        allowNull: false
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