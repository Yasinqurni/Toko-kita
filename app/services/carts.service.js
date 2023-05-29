class cartService {

    constructor(cartQueries) {
        this.query = cartQueries
    }

    async GetByStatus(status, auth) {
        return await this.query.GetByStatus(status, auth)
    }

    async Create(status, auth) {
        return await this.query.Create(status, auth)
    }

    async GetAll(auth) {
        return await this.query.GetAll(auth)
    }

    async Update(status, payload) {
        return await this.query.Update(status, payload)
    }
}

module.exports = cartService