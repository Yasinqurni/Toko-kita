class transactionQueries {

    constructor(Transaction) {
        this.model = Transaction
    }

    async Create(userId, status, orderId, expiredAt) {
        return this.model.create({
            user_id: userId,
            status_transaction: status,
            order_id: orderId,
            expired_at: expiredAt 
        })
    }

    async CreateBulk(payload) {
        return this.model.bulkCreate(payload)
    }

    async GetAll(auth) {
        return this.model.findAll({
            where: {user_id: auth},
            // include: [
            //     { model: this.image},
            //     { model: this.category}
            // ],
        })
    }
    
    async GetById(id) {
        return this.model.findOne({
            where: {id: id}
        })
    }

    async Delete(id) {
        return this.model.destroy({
            where: { 
                id: id,
            }
        })
    }

    async Update(id, body) {
        return this.model.update(body, {
            where: { 
                id: id,
            }
        })
    }
}

module.exports = transactionQueries