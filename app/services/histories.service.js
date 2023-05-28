class historyService {

    constructor(historyQueries) {
        this.query = historyQueries
    }

    async Create(userId, description, date){
        return await this.query.Create(userId, description, date)
    }

    async GetAll(walletId) {
        return await this.query.GetAll(walletId)
    }
}

module.exports = historyService