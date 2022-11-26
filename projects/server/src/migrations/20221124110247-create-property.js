'use strict';
const {Sequelize} = require("sequelize");
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
        type : Sequelize.STRING,
        allowNull : false
      },
      description : {
        type : Sequelize.TEXT,
        allowNull : false
      },
      picture : {
        type : Sequelize.TEXT,
        allowNull : false
      },
      rules : {
        type : Sequelize.TEXT,
        allowNull : false
      },
      tenantId : {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      categoryId : {
        type: Sequelize.INTEGER,
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