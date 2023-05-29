class historyService {

    constructor(historyQueries) {
        this.query = historyQueries
    }

    async Create(walletId, nominal, type, description){
        const date = new Date()
        return await this.query.Create(walletId, nominal, type, description, date)
    }

    async GetAll(walletId) {
        return await this.query.GetAll(walletId)
    }
}

module.exports = historyService