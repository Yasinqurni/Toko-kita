class transactionService {

    constructor(transactionQueries ) {
       this.query = transactionQueries 
    }

    async Create(userId, status, orderId, expiredAt) {
        return await this.query.Create(userId, status, orderId, expiredAt)
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