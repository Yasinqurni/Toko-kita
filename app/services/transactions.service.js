class transactionService {

    constructor(transactionQueries ) {
       this.query = transactionQueries 
    }

    async Create(userId, status, orderId, expiredAt) {
        return await this.query.Create(userId, status, orderId, expiredAt)
    }

    async CreateBulk(payload, orderId){

        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
        console.log(payload)
        const data = payload.map((item) => {
            return {
                user_id: item.item.user_id,
                status_transaction: "waiting",
                order_id: orderId,
                expired_at: oneHourAgo,
            }
        })
        console.log(data)
        return await this.query.CreateBulk(data)
    }

    async GetAll(auth) {
        return await this.query.GetAll(auth)
    }

    async GetById(id) {
        return await this.query.GetById(id)
    }

    async Delete(id) {
        return await this.query.Delete(id)
    }

    async Update(id) {
        return await this.query.Update(id)
    }
}

module.exports = transactionService