
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/config")

class transaction extends Model {
}

transaction.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status_transaction: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expired_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
  
)
// return transaction

module.exports = transaction