class itemService {

    constructor(itemQueries) {
        this.query = itemQueries
    }

    async Create(payload, auth) {
        return await this.query.Create(payload, auth)
    }

    async GetAll(limit, offset) {
        return await this.query.GetAll(limit, offset)
    }

    async GetAllById(auth, limit, offset) {
        return await this.query.GetAllById(auth, limit, offset)
    }

    async GetById(payload) {
        return await this.query.GetById(payload)
    }

    async GetByUserId(userId, auth) {
        return await this.query.GetByUserId(userId, auth)
    }

    async GetBypayload(payload) {
        return await this.query.GetByPayload(payload)
    }

    async Delete(payload) {
        return await this.query.Delete(payload)
    }

    async Update(payload, body) {
        return await this.query.Update(payload, body)
    }

    async UpdateQty(payload, qty) {
        return await this.query.UpdateQty(payload, qty)
    }
}

module.exports = itemService