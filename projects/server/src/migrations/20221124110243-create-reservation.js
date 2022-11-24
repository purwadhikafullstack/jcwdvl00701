'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate : {
        type : Sequelize.DATE,
        allowNull : false
      },
      endDate : {
        type : Sequelize.DATE,
        allowNull : false
      },
      status : {
        type : Sequelize.SMALLINT,
        allowNull : false
      },
      guestCount : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      userId : {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Reservations');
  }
};