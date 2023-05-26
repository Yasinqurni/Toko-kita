const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/config")

class item_cart extends Model {
}

item_cart.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'item_id'
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cart_id'
      },
      quantity_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      }
  },
  {
    //bila terdapat error "relation \"item_carts\" does not exist" solusi freezeTableName: true
    //agar si sequelize tidak menggenerate item_cart menjadi item_carts
    //karena didalam migration terdeclare sebagai item_cart bukan item_carts
    freezeTableName: true,
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
)

module.exports = item_cart