class userService {

    constructor(userQueries) {
        this.query = userQueries
    }

    async Create(payload, role) {
        return await this.query.Create(payload, role)
    }

    async GetByEmail(payload) {
        return await this.query.GetByEmail(payload)
    }

    async GetById(payload) {
        return await this.query.GetById(payload)
    }

    async Delete(payload) {
        return await this.query.Delete(payload)
    }
    
 }

module.exports = userService