"use strict";
const { sequelize, Tenant, Category } = require("../models");

const currentDate = new Date();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // const tenants = await Tenant.findAll()
    // const categories = await Category.findAll()
    // const properties = [
    //   {
    //     id: 1,
    //     name: 'prop1',
    //     description: 'test',
    //     rules: 'test',
    //     tenantId: tenants[0].id,
    //     categoryId: categories[0].id,
    //     createdAt: currentDate,
    //     updatedAt: currentDate
    //   },
    //   {
    //     id: 2,
    //     name: 'prop2',
    //     description: 'test',
    //     rules: 'test',
    //     tenantId: tenants[0].id,
    //     categoryId: categories[1].id,
    //     createdAt: currentDate,
    //     updatedAt: currentDate
    //   },
    //   {
    //     id: 3,
    //     name: 'prop3',
    //     description: 'test',
    //     rules: 'test',
    //     tenantId: tenants[1].id,
    //     categoryId: categories[0].id,
    //     createdAt: currentDate,
    //     updatedAt: currentDate
    //   },
    //   {
    //     id: 4,
    //     name: 'prop4',
    //     description: 'test',
    //     rules: 'test',
    //     tenantId: tenants[1].id,
    //     categoryId: categories[1].id,
    //     createdAt: currentDate,
    //     updatedAt: currentDate
    //   },
    // ]
    // await queryInterface.bulkInsert('Properties', properties, {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Properties', null, {});
  },
};
