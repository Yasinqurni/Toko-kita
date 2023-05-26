const { Image } = require('../../db/models')

const createBulkImage = (payload) => {
    return Image.bulkCreate(payload)
}

const findImage = (payload) => {
    return Image.findOne({
        where: {id: payload.id}
    })
}

const deleteImage = (payload) => {
    return Image.destroy({
        where: {id: payload.id}
    })
}
module.exports = {
    createBulkImage,
    findImage,
    deleteImage,
}