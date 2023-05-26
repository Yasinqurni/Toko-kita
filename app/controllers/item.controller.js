const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')
const { itemQueries } = require('../queries')
const { pagination, getPagingData } = require('../services/pagination')
const itemDecorator = require('../decorators/items-decorator')


class itemController {

    async createItem(req, res) {
        try {
            const payload = req.body
            if (!payload) { return responseHendler.notFound(res, message('body').notFoundResource) }

            const auth = req.userId
            // create item
            const createItem = await itemQueries.createItem(payload, auth)
            if (!createItem) { return responseHendler.badRequest(res, message('item').invalidCreateResource) }

            return responseHendler.ok(res, message('item').created)
        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async readItem(req, res) {

        try {

            const { page = '1', limit = '5' } = req.query

            const pagin = pagination(page, limit)

            const getAllItem = await itemQueries.findAllItem(pagin.limitInt, pagin.offset)
            if (getAllItem.length == 0) { return responseHendler.notFound(res, message('item').notFoundResource) }

            // const getDataPagging = getPagingData(getAllItem, page, limit)
            // console.log(getDataPaggi ng)

            const data = await itemDecorator.itemDecoratorArray(getAllItem)
            // const data =  getAllItem

            return responseHendler.ok(res, message('get item').success, data)

        }

        catch (err) {
            console.log(err)
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async readItemById(req, res) {

        try {
            const payload = req.params
            console.log(!payload);
            if (!payload) { return responseHendler.badRequest(res, message('req.params').incompleteKeyOrValue) }

            const findItem = await itemQueries.findById(payload)

            if (!findItem) { return responseHendler.notFound(res, message('item').notFoundResource) }

            const data = itemDecorator.itemDecoratorObject(findItem)
            return responseHendler.ok(res, message('get item').success, data)
        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async deleteItem(req, res) {

        try {
            const payload = req.params
            const auth = req.userId

            const findItem = await itemQueries.findByUserId(payload, auth)
            if (!findItem) { return responseHendler.notFound(res, message('item').notFoundResource) }

            const deleteItem = await itemQueries.deleteItem(payload)
            if (!deleteItem) { return responseHendler.badRequest(res, message().serverError) }

            return responseHendler.ok(res, message('item').deleted)
        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }

    }

    async updateItem(req, res) {

        try {
            const payload = req.params
            const auth = req.userId

            const findItem = await itemQueries.findByUserId(payload, auth)

            if (!findItem) { return responseHendler.notFound(res, message('item').notFoundResource) }
            
            const updateItem = await itemQueries.updateItem(findItem, req.body)
            if (!updateItem) { return responseHendler.badRequest(res, message().serverError) }

            return responseHendler.ok(res, message('item').updated)
        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async getItemSeller(req, res) {
        try {

            const { page = '1', limit = '5' } = req.query

            const pagin = pagination(page, limit)

            const auth = req.userId
            const findAllItem = await itemQueries.findAllItemById(auth, pagin.limitInt, pagin.offset)
            if (findAllItem.length == 0) { return responseHendler.notFound(res, message('item').notFoundResource) }

            const data = await itemDecorator.itemDecoratorArray(findAllItem)

            return responseHendler.ok(res, message('get item').success, data)
        }

        catch (err) {
            console.log(err)
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }
}

module.exports = {
    itemController,
}