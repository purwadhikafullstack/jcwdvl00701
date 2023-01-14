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
        type : DataTypes.STRING,
        allowNull : false,
      },
      defaultPrice : {
        type : DataTypes.INTEGER,
        allowNull : false,
        default: 0
      },
      description : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      capacity : {
        type : DataTypes.INTEGER,
        allowNull : false,
        default: 1
      },
      propertyId : {
        type : DataTypes.INTEGER,
        allowNull : false,
      },
        deletedAt : {
        type : DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      paranoid : true,
      deletedAt : "soft_delete"
    }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};