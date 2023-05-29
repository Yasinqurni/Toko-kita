
class cartQueries {

    constructor(Cart, Item_cart, Item, User) {
        this.cart = Cart
        this.itemCart = Item_cart
        this.item = Item
        this.user = User
    }

    async GetByStatus (status, auth) {
        return this.cart.findOne({
            where: { 
                status_cart: status,
                user_id: auth,
                },
            include: [
                {
                    model: this.user
                },
                {
                    model: this.itemCart,
                    include: {
                        model: this.item,
                    }
                }
            ],
                
        })
    } 
    
    async Create (status, auth) {
        return this.cart.create({
            user_id: auth,
            status_cart: status
        })
    }
    
    async GetAll (auth) {
        return this.cart.findAll({
            include: [
                {
                    model: this.user,
                },
                {
                    model: this.itemCart,
                    include: {
                        model: this.item,
                    }
                }
            ],
            where: {user_id: auth}
        })
       
    }
    
    async Update (status, payload) {
        return this.cart.update(
            { status_cart: status },
            { where: {id: payload.id}}
        )
    }
}

module.exports = cartQueries
