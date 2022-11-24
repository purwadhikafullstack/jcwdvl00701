'use strict';

const constraintName = 'fk-specialprice-room'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('SpecialPrices', {
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
      'SpecialPrices', constraintName
    )
  }
};
