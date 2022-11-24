'use strict';

const constraintName = 'fk-property-category'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Properties', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: constraintName,
      references: { //Required field
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Properties', constraintName
    )
  }
};
