
class orderQueries {

    constructor(Order) {
        this.model = Order
    }

    async Create (payload, status, totalPrice, walletId) {
        return this.model.create({
            user_id: payload.user_id,
            cart_id: payload.id,
            status_order: status,
            total_price: totalPrice,
            wallet_id: walletId
        })
    }
    
    async GetByStatus (auth, status) { //status pending
        return this.model.findOne({
            where: {
                user_id: auth,
                status_order: status
                }
        })
    }
    
    async Update (payload, status) {
        return this.model.update(
            {status_order: status},
            {where: {id: payload.id}})
    }
    
    async Delete (payload) {
        return this.model.destroy({
            where: {id: payload.id}
        })
    }
    
}

module.exports = orderQueries
