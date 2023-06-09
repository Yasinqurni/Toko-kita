

class itemCartQueries {

    constructor(Item_cart, Item) {
        this.model = Item_cart
        this.item = Item
    }

    async Create (payloadItem, payloadCart, qty, totalprice) {
        return this.model.create({
            item_id: payloadItem,
            cart_id: payloadCart,
            quantity_order: qty,
            total_price: totalprice
        })
    }
    
    async GetAll(payload) {
        return this.model.findAll({
          where: { cart_id: payload.id },
          include: [
            { model: this.item }
          ]
        });
      }
}

module.exports = itemCartQueries


