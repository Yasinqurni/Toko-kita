const { Order } = require('../../db/models')

const createOrder = async (payload, status, totalPrice) => {
    return Order.create({
        user_id: payload.user_id,
        cart_id: payload.id,
        status_order: status,
        total_price: totalPrice
    })
}

const findOrder = async (auth, status) => { //status pending
    return Order.findOne({
        where: {
            user_id: auth,
            status_order: status
            }
    })
}

const updateOrder = async (payload, status) => {
    return Order.update(
        {status_order: status},
        {where: {id: payload.id}})
}

const deleteOrder = async (payload) => {
    return Order.destroy({
        where: {id: payload.id}
    })
}
module.exports = {
    createOrder,
    findOrder,
    updateOrder,
    deleteOrder,
}