'use strict';

const constraintName = 'fk-tenant-bank'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Tenants', {
      fields: ['bankId'],
      type: 'foreign key',
      name: constraintName,
      references: { //Required field
        table: 'Banks',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Tenants', constraintName
    )
  }
};
