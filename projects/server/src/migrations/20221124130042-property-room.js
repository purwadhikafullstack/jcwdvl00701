'use strict';

const constraintName = 'fk-room-property'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Rooms', {
      fields: ['propertyId'],
      type: 'foreign key',
      name: constraintName,
      references: { //Required field
        table: 'Properties',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Rooms', constraintName
    )
  }
};
