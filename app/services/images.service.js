class imageService{
    constructor(imageQueries) {
        this.imageQueries = imageQueries
    }

    async CreateBulk(payload) {
        return await this.imageQueries.CreateBulk(payload)
    }

    async GetById(payload) {
        return await this.imageQueries.GetById(payload)
    }

    async Delete(payload) {
        return await this.imageQueries.Delete(payload)
    }
}

module.exports = imageService