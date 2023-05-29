const User = require('./users.model')
const Item = require('./items.model')
const Cart = require('./carts.model')
const Image = require('./images.model')
const Order = require('./orders.model')
const Item_cart = require('./item_cart.model')
const Transaction = require('./transaction.model')
const Wallet = require('./wallet.model')
const History = require('./histories.model')

const sequelize = require('sequelize')


Item.belongsTo(User, {foreignKey: 'user_id'})

Order.belongsTo(User, {foreignKey: 'user_id'})

//relasi asli
Image.belongsTo(Item, {foreignKey: 'item_id'})
// untuk menampikan data image didalam item
Item.hasMany(Image, {foreignKey: 'item_id'})

Cart.belongsTo(User, {foreignKey: 'user_id'})
User.hasMany(Cart, {foreignKey: 'user_id'})

Item_cart.belongsTo(Item, {foreignKey: 'item_id'})

Item.hasMany(Item_cart, {foreignKey: 'item_id'})

Item_cart.belongsTo(Cart, {foreignKey: 'cart_id'})

Cart.hasMany(Item_cart, {foreignKey: 'cart_id'})

Item.belongsTo(User, {foreignKey: 'user_id'})

Wallet.hasMany(Order, {foreignKey: 'wallet_id'})

Order.belongsTo(Wallet, {foreignKey: 'wallet_id'})

User.hasOne(Wallet, {foreignKey: 'user_id'})

Wallet.belongsTo(User, { foreignKey: 'user_id' })

Order.hasMany(Transaction, {foreignKey: 'order_id'})

Transaction.belongsTo(Order, {foreignKey: 'order_id'})

User.hasMany(Transaction, {foreignKey: 'user_id'})

Transaction.belongsTo(User, {foreignKey: 'user_id'})

Wallet.hasMany(History, {foreignKey: 'wallet_id'})

History.belongsTo(Wallet, {foreignKey: 'wallet_id'})

module.exports = {
    User,
    Item,
    Cart,
    Image,
    Order,
    Item_cart,
    Transaction,
    Wallet,
    History,
    sequelize
}