const { Cart, Item_cart, Item, User } = require('../../db/models')



const findOneCart = async (status, auth) => {
    return Cart.findOne({
        where: { 
            status_cart: status,
            user_id: auth,
            },
        include: [
            {
                model: User,
            },
            {
                model: Item_cart,
                include: {
                    model: Item,
                }
            }
        ],
            
    })
} 

const createCart = async (status, auth) => {
    return Cart.create({
        user_id: auth,
        status_cart: status
    })
}

const findAllCart = async (auth) => {
    return Cart.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Item_cart,
                include: {
                    model: Item,
                }
            }
        ],
        where: {user_id: auth}
    })
   
}

const updateCart = async (status, payload) => {
    return Cart.update(
        { status_cart: status },
        { where: {id: payload.id}}
    )
}

   
module.exports = {
    findOneCart,
    findAllCart,
    createCart,
    updateCart,

}