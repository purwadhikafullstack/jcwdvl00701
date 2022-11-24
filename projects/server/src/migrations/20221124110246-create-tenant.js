'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tenants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : {
        type : Sequelize.STRING,
        allowNull: false
      },
      email :  {
        type : Sequelize.STRING,
        allowNull: false,
        unique : true
      },
      password : {
        type : Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber : {
        type : Sequelize.STRING,
      },
      idCardPic : {
        type : Sequelize.STRING,
      },
      bankAccountNumber : {
        type : Sequelize.STRING,
      },
      bankId : {
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
    await queryInterface.dropTable('Tenants');
  }
};