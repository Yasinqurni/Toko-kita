const User = require('./users.model')
const Item = require('./items.model')
const Cart = require('./carts.model')
const Category = require('./category.model')
const Image = require('./images.model')
const Order = require('./orders.model')
const Item_cart = require('./item_cart.model')
const Chat = require('./chats.model')
const sequelize = require('sequelize')


Item.belongsTo(User, {
    foreignKey: 'user_id'
})

Order.belongsTo(User, {
    foreignKey: 'user_id'
})

//relasi asli
Image.belongsTo(Item, {
    foreignKey: 'item_id'
})
// untuk menampikan data image didalam item
Item.hasMany(Image, {
    foreignKey: 'item_id'
})

Item.belongsTo(Category, {
    foreignKey: 'category_id'
})
Cart.belongsTo(User, {
    foreignKey: 'user_id'
})
User.hasMany(Cart, {
    foreignKey: 'user_id'
})

Item_cart.belongsTo(Item, {
    foreignKey: 'item_id'
})

Item.hasMany(Item_cart, {
    foreignKey: 'item_id'
})

Item_cart.belongsTo(Cart, {
    foreignKey: 'cart_id'
})

Cart.hasMany(Item_cart, {
    foreignKey: 'cart_id'
})

Chat.belongsTo(User, {
    as: 'owner',
    foreignKey: 'sender_id'
})

User.hasMany(Chat, {
    as: 'chats',
    foreignKey: 'id'
})

Item.belongsTo(User, {
    foreignKey: 'user_id'
})
// Cart.belongsToMany(Item, {through: Item_cart})
// Item.belongsToMany(Cart, {through: Item_cart})
// // order.hasOne(cart, {
//     foreignKey: 'cart_id'
// })


module.exports = {
    User,
    Item,
    Cart,
    Category,
    Image,
    Order,
    Item_cart,
    Chat,
    sequelize
}