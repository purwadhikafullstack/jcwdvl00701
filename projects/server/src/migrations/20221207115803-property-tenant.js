"use strict";

const constraintName = "fk-property-tenant";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Properties", {
      fields: ["tenantId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "Tenants",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Properties", constraintName);
  },
};
