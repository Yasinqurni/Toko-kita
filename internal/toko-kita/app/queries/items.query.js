const { Item, Image, Category, User } = require('../../db/models')

//create item
const createItem = async (payload, auth) => {
    return Item.create({
        user_id: auth,
        name_item: payload.name_item,
        category_id: payload.category_id,  
        price: payload.price,
        quantity: payload.quantity
    })
}

const findAllItem = (limit, offset) => {
    return Item.findAll({
        include: [
            { model: Image},
            { model: Category},
            { model: User}
        ],
        limit: limit,
        offset: offset
    })
}

const findAllItemById = (auth, limit, offset) => {
    return Item.findAll({
        where: {user_id: auth},
        include: [
            { model: Image},
            { model: Category}
        ],
        limit: limit,
        offset: offset
    })
}

const findById = (payload) => {
    return Item.findOne({
        where: { id: payload.id },
        include: [
            { model: Image},
            { model: Category}
        ],
    })
}

const findByUserId = (payload, auth) => {
    return Item.findOne({
        where: { 
            id: payload.id,
            user_id: auth
         }
        
    })
}

const findByPayload = (payload) => {
    return Item.findOne({
        where: { 
            id: payload,
         }
        
    })
}

const deleteItem = (payload) => {
    return Item.destroy({
        where: { 
            id: payload.id,
         }
    })
}

const updateItem = (payload, body) => {
    return Item.update(body, {
        where: { 
            id: payload.id,
         }
    })
}

const updateQty = (payload, qty) => {
    return Item.update(
        { quantity: qty }, 
        { where: { id: payload}})
}

module.exports = {
    createItem,
    findAllItem,
    findAllItemById,
    findById,
    deleteItem,
    findByUserId,
    updateItem,
    findByPayload,
    updateQty,
}