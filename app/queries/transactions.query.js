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

    async GetAll(status) {
        return this.model.findAll({
            where: {status_transaction: status},
        })
    }
    
    async GetByUserId(id, status) {
        return this.model.findOne({
            where: {user_id: id, status_transaction: status}
        })
    }

    async Delete(id) {
        return this.model.destroy({
            where: { 
                id: id,
            }
        })
    }

    async Update(id, status) {
        return this.model.update(
            {status_transaction: status}, 
            {
                where: { 
                    id: id,
                }
            })
      }
}

module.exports = transactionQueries