const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/config")

class cart extends Model {
}

cart.init(
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
      status_cart: {
        type: DataTypes.STRING,
        allowNull: false,
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
  },
)

module.exports = cart