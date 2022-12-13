'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
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
      description : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      pic : {
        type : DataTypes.STRING,
      },
      rules : {
        type : DataTypes.STRING,
      },
      tenantId : {
        type : DataTypes.INTEGER,
        allowNull : false,
      },
      categoryId : {
        type : DataTypes.INTEGER,
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
    await queryInterface.dropTable('Properties');
  }
};