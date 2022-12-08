'use strict';

const constraintName = 'fk-roomunavailability-room'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('RoomUnavailabilities', {
      fields: ['roomId'],
      type: 'foreign key',
      name: constraintName,
      references: { //Required field
        table: 'Rooms',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
        'RoomUnavailabilities', constraintName
    )
  }
};
