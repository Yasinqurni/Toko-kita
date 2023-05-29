'use strict'

const sequelize = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: "users",
          key: "id",
          as: "user_id"
        }
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: "orders",
          key: "id",
          as: "order_id"
        }
      },
      status_transaction: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expired_at: {
        type: Sequelize.DATE,
        allowNull: false
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
     await queryInterface.dropTable('transactions')
  }
}
