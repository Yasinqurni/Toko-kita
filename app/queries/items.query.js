
class itemQueries {

    constructor(Item, Image, Category, User) {
        this.item = Item
        this.image = Image
        this.category = Category
        this.user = User
    }

    //create item
    async Create (payload, auth) {
        return this.item.create({
            user_id: auth,
            name_item: payload.name_item,
            category_id: payload.category_id,  
            price: payload.price,
            quantity: payload.quantity
        })
    }

    async GetAll (limit, offset) {
        return Item.findAll({
            include: [
                { model: this.image},
                { model: this.category},
                { model: this.user}
            ],
            limit: limit,
            offset: offset
        })
    }

    async GetAllById (auth, limit, offset) {
        return this.item.findAll({
            where: {user_id: auth},
            include: [
                { model: this.image},
                { model: this.category}
            ],
            limit: limit,
            offset: offset
        })
    }

    async GetById (payload) {
        return this.item.findOne({
            where: { id: payload.id },
            include: [
                { model: this.image},
                { model: this.category}
            ],
        })
    }

    async GetByUserId (payload, auth) {
        return this.item.findOne({
            where: { 
                id: payload.id,
                user_id: auth
            }
            
        })
    }

    async GetByPayload (payload) {
        return this.item.findOne({
            where: { 
                id: payload,
            }
            
        })
    }

    async Delete (payload) {
        return this.item.destroy({
            where: { 
                id: payload.id,
            }
        })
    }

    async Update (payload, body) {
        return this.item.update(body, {
            where: { 
                id: payload.id,
            }
        })
    }

    async UpdateQty (payload, qty) {
        return this.item.update(
            { quantity: qty }, 
            { where: { id: payload}})
    }

}

module.exports = itemQueries
