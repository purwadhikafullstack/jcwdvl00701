'use strict';

const currentDate = new Date()
const roles = [
  {id: 1, name: 'customer', createdAt: currentDate, updatedAt: currentDate},
  {id: 2, name: 'tenant', createdAt: currentDate, updatedAt: currentDate}
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
