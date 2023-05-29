const userQueries = require('./users.query')
const itemQueries = require('./items.query')
const cartQueries = require('./carts.query')
const itemCartQueries = require('./item_carts.query')
const orderQueries = require('./orders.query')
const imageQueries = require('./images.query')
const transactionQueries = require('./transactions.query')
const walletQueries = require('./wallets.query')
const historyQueries = require('./histories.query')

module.exports = {
    userQueries,
    itemQueries,
    cartQueries,
    itemCartQueries,
    orderQueries,
    imageQueries,
    transactionQueries,
    walletQueries,
    historyQueries,

}