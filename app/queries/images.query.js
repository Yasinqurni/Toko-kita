const { Image } = require('../../db/models')


class imageQueries {

    constructor(Image) {
        this.model = Image
    }

    async CreateBulk (payload) {
        return this.model.bulkCreate(payload)
    }
    
    async GetById (payload) {
        return this.model.findOne({
            where: {id: payload.id}
        })
    }
    
    async Delete (payload) {
        return this.model.destroy({
            where: {id: payload.id}
        })
    }
}

module.exports = imageQueries
