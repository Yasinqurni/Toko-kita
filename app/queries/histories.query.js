class historyQueries {

    constructor(History) {
        this.model = History
    }

    async Create(walletId, description, date) {
        return this.model.create({
            wallet_id: walletId,
            description: description,
            date: date
        })
    }

    async GetAll(walletId) {
        return this.model.findAll({
            where: {wallet_id: walletId},
        })
    }
    
}

module.exports = historyQueries