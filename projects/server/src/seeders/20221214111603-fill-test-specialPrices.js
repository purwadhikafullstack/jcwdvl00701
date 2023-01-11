'use strict';
const {sequelize, Room} = require('../models')

const currentDate = new Date()
const tomorrowDate = new Date()
tomorrowDate.setDate(tomorrowDate.getDate() + 1)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rooms = await Room.findAll()

    const specialPrices = [
      {
        id: 1,
        type: 'nominal',
        discount: 1000,
        startDate: currentDate,
        endDate: tomorrowDate,
        roomId: rooms[0].id,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 2,
        type: 'percentage',
        discount: 50,
        startDate: currentDate,
        endDate: tomorrowDate,
        roomId: rooms[1].id,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 3,
        type: 'nominal',
        discount: 1000,
        startDate: currentDate,
        endDate: tomorrowDate,
        roomId: rooms[2].id,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 4,
        type: 'percentage',
        discount: 50,
        startDate: currentDate,
        endDate: tomorrowDate,
        roomId: rooms[3].id,
        createdAt: currentDate,
        updatedAt: currentDate
      },
    ]

    await queryInterface.bulkInsert('SpecialPrices', specialPrices, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpecialPrices', null, {});
  }
};
