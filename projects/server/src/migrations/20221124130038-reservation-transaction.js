'use strict';

const constraintName = 'fk-transaction-reservation'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Transactions', {
      fields: ['reservationId'],
      type: 'foreign key',
      name: constraintName,
      references: { //Required field
        table: 'Reservations',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Transactions', constraintName
    )
  }
};
