"use strict";
const { sequelize, User, Bank } = require("../models");

const currentDate = new Date();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // const users = await User.findAll()
    // const bank = await Bank.findAll({limit: 1})
    // const tenants = [
    //     {
    //         id: 1,
    //         name: 'tenant1',
    //         phoneNumber: '081617325185',
    //         bankAccountNumber: '123412341',
    //         userId: users[0].id,
    //         bankId: bank[0].id,
    //         createdAt: currentDate,
    //         updatedAt: currentDate
    //     },
    //     {
    //         id: 2,
    //         name: 'tenant2',
    //         phoneNumber: '081617325184',
    //         bankAccountNumber: '123412342',
    //         userId: users[1].id,
    //         bankId: bank[0].id,
    //         createdAt: currentDate,
    //         updatedAt: currentDate
    //     },
    // ]
    // await queryInterface.bulkInsert('Tenants', tenants, {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Tenants', null, {});
  },
};
