const { Sequelize } = require('sequelize')
const db = require('./database')

const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
    define: {
        underscored: true,
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idlel: 10000,
    }
})

module.exports = sequelize