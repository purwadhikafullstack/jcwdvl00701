'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : {
        type : Sequelize.STRING,
        allowNull : false
      },
      defaultPrice : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      description : {
        type : Sequelize.TEXT,
      },
      capacity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        default: 1
      },
      propertyId : {
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
    await queryInterface.dropTable('Rooms');
  }
};