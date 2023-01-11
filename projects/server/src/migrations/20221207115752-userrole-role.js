'use strict';

const constraintName = 'fk-userrole-role'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('UserRoles', {
      fields: ['roleId'],
      type: 'foreign key',
      name: constraintName,
      references: { //Required field
        table: 'Roles',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
        'UserRoles', constraintName
    )
  }
};
