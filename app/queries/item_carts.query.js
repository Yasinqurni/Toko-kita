const { Item_cart } = require('../../db/models')

const createItemCart = async (payloadItem, payloadCart, qty, totalprice) => {
    return Item_cart.create({
        item_id: payloadItem,
        cart_id: payloadCart,
        quantity_order: qty,
        total_price: totalprice
    })
}

const findItemCart = async (payload) => {
    return Item_cart.findAll({
        where: { cart_id: payload.id}
      })
    
}


module.exports = {
    createItemCart,
    findItemCart,
}