class walletService {

    constructor(walletQueries) {
       this.query = walletQueries
    }

    async Create(userId, saldo) {
        return await this.query.Create(userId, saldo)
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

    async Update(id, saldo) {
        return await this.query.Update(id, saldo)
    }

    async GetByUserId(id) {
        return await this.query.GetByUserId(id)
    }
}

module.exports = walletService