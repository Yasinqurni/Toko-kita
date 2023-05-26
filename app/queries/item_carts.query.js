

class itemCartQueries {

    constructor(Item_cart) {
        this.model = Item_cart
    }

    async Create (payloadItem, payloadCart, qty, totalprice) {
        return this.model.create({
            item_id: payloadItem,
            cart_id: payloadCart,
            quantity_order: qty,
            total_price: totalprice
        })
    }
    
    async GetAll (payload) {
        return this.model.findAll({
            where: { cart_id: payload.id}
          })
        
    }
}

module.exports = itemCartQueries


