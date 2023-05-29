class transactionService {

    constructor(transactionQueries ) {
       this.query = transactionQueries 
    }

    async Create(userId, status, orderId, expiredAt) {
        return await this.query.Create(userId, status, orderId, expiredAt)
    }

    async CreateBulk(payload, orderId){

        // const time = new Date(Date.now() + 60 * 60 * 1000)
        const time = new Date()
        time.setDate(time.getDate() + 3)
    
        const data = payload.map((item) => {
            return {
                user_id: item.item.user_id,
                status_transaction: "waiting",
                order_id: orderId,
                expired_at: time,
            }
        })
        console.log(data)
        return await this.query.CreateBulk(data)
    }

    async GetAll(status) {
        return await this.query.GetAll(status)
    }

    async GetAllByUserId(userId) {
        return await this.query.GetAllByUserId(userId)
    }

    async GetByUserId(id, status) {
        return await this.query.GetByUserId(id, status)
    }

    async GetById(id, auth, status) {
        return await this.query.GetById(id, auth, status)
    }

    async Delete(id) {
        return await this.query.Delete(id)
    }

    async Update(id, status) {
        return await this.query.Update(id, status)
    }
}

module.exports = transactionService