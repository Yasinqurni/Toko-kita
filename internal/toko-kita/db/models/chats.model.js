const { Model,DataTypes } = require("sequelize");
const sequelize = require("../config/config.js")

class Chat extends Model {
    
}

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          sender_id: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          room_id: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          message: {
            type: DataTypes.STRING,
            allowNull: true
          },
    },
    {
        sequelize: sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true
    },
)

module.exports = Chat;