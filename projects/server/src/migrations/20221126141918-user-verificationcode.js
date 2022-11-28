'use strict';

const constraintName = 'fk-verificationcode-user'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('VerificationCodes', {
      fields: ['userId'],
      type: 'foreign key',
      name: constraintName,
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'VerificationCodes', constraintName
    )
  }
};
