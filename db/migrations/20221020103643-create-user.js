'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      role: {
        type: Sequelize.ENUM('admin','user'),
        allowNull:false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      access_token:{
        type:Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};