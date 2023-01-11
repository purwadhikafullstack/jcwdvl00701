'use strict';
const {sequelize, Property} = require('../models')

const currentDate = new Date()
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const properties = await Property.findAll()

        const rooms = [
            {
                id: 1,
                name: 'room1',
                defaultPrice: 1000,
                description: 'test',
                capacity: 2,
                propertyId: properties[0].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                id: 2,
                name: 'room2',
                defaultPrice: 2000,
                description: 'test',
                capacity: 4,
                propertyId: properties[0].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                id: 3,
                name: 'room1',
                defaultPrice: 2000,
                description: 'test',
                capacity: 2,
                propertyId: properties[1].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                id: 4,
                name: 'room2',
                defaultPrice: 4000,
                description: 'test',
                capacity: 4,
                propertyId: properties[1].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                id: 5,
                name: 'room1',
                defaultPrice: 4000,
                description: 'test',
                capacity: 2,
                propertyId: properties[2].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                id: 6,
                name: 'room2',
                defaultPrice: 8000,
                description: 'test',
                capacity: 4,
                propertyId: properties[2].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                id: 7,
                name: 'room1',
                defaultPrice: 8000,
                description: 'test',
                capacity: 2,
                propertyId: properties[3].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                id: 8,
                name: 'room2',
                defaultPrice: 16000,
                description: 'test',
                capacity: 4,
                propertyId: properties[3].id,
                createdAt: currentDate,
                updatedAt: currentDate
            },
        ]

        await queryInterface.bulkInsert('Rooms', rooms, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Rooms', null, {});

    }
};
