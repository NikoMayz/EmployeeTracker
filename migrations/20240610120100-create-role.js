'use strict';

const Sequelize = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('role', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
      },
      salary: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'department',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

  async down(queryInterface) {
    await queryInterface.dropTable('role');
  }
};
