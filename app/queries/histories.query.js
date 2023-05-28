class historyQueries {

    constructor(History) {
        this.model = History
    }

    async Create(walletId, nominal, type, description, date) {
        return this.model.create({
            wallet_id: walletId,
            nominal: nominal,
            type: type,
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