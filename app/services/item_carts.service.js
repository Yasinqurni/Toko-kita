class itemCartService {
    
    constructor(itemCartQueries) {
        this.query = itemCartQueries
    }

    async Create(payloadItem, payloadCart, qty, totalprice) {
        return await this.query.Create(payloadItem, payloadCart, qty, totalprice)
    }

    async GetAll(payload) {
        return await this.query.GetAll(payload)
    }
}

module.exports = itemCartService