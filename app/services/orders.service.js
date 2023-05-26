class orderService {

    constructor(orderQueries) {
        this.orderQueries = orderQueries
    }

    async Create(payload, status, totalPrice) {
        return await this.orderQueries.Create(payload, status, totalPrice)
    }

    async GetByStatus(auth, status) {
        return await this.orderQueries.GetByStatus(auth, status)
    }

    async Update(payload, status) {
        return await this.orderQueries.Update(payload, status)
    }

    async Delete(payload) {
        return await this.orderQueries.Delete(payload)
    }
}

module.exports = orderService