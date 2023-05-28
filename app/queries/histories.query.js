class historyQueries {

    constructor(History) {
        this.model = History
    }

    async Create(userId, description, date) {
        return this.model.create({
            wallet_id: userId,
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