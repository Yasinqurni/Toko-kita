
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/config")

class wallet extends Model {
}

wallet.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
    },
    saldo: {
    type: DataTypes.DOUBLE,
    allowNull: true
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
// return wallet

module.exports = wallet