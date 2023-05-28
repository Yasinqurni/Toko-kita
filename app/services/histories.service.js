class historyService {

    constructor(historyQueries) {
        this.query = historyQueries
    }

    async Create(walletId, description){
        const date = new Date()
        return await this.query.Create(walletId, description, date)
    }

    async GetAll(walletId) {
        return await this.query.GetAll(walletId)
    }
}

module.exports = historyService