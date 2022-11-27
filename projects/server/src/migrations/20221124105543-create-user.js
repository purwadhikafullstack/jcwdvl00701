'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            phoneNumber: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            birthdate: {
                type: Sequelize.DATEONLY
            },
            profilePic: {
                type: Sequelize.TEXT
            },
            resetPasswordToken: {
                type: Sequelize.STRING
            },
            resetPasswordExpires: {
                type: Sequelize.DATE
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};