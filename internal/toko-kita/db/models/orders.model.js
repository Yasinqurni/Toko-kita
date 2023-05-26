const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/config")

class order extends Model {
}

order.init(
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
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cart_id'
      },
      total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status_order: {
        type: DataTypes.STRING,
        allowNull: false
      }
  },
  {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
)

module.exports = order