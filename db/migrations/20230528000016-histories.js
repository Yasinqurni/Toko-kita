'use strict'

const sequelize = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('histories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: "wallets",
          key: "id",
          as: "wallet_id"
        }
      },
      nominal: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('histories')
  }
}
