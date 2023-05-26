const bcrypt = require('../../lib/bcrypt')

class userQueries {
    
    constructor(User) {
        this.model = User
    }

    async Create (payload, role) {
        return this.model.create({
            fullname: payload.fullname,
            address: payload.address,
            phone: payload.phone,
            email: payload.email,
            password: bcrypt.bcrypt.hashSync(payload.password, 8),
            role: role
        })
    }
    
    async GetByEmail (payload) {
        return this.model.findOne({
            where: { email: payload.email }
        })
    }
    
    async GetById (payload) {
        return this.model.findOne({
            where: { id: payload }
        })
    }
    
    async Delete (payload) {
        return this.model.destroy({ where: { email: payload.email } })
    }
    
}

module.exports = userQueries
