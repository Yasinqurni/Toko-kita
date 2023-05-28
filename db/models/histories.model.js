
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/config")

class history extends Model {
}

history.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    wallet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'wallet_id'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
      },
    date: {
    type: DataTypes.DATE,
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

module.exports = history