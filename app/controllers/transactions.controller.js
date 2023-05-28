const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')


class transactionController{

    constructor(transactionService) {
        this.transactionService = transactionService
    }

    //cek expired
    async updateExpTrx() {

        try {

            const getTransaction = await this.transactionService.GetAll('waiting');
            if (getTransaction.length === 0) {
                console.info('transaction is empty');
                
            }

            for (const transaction of getTransaction) {
                if (transaction.expired_at < new Date()) {
                await this.transactionService.Update(transaction.id, 'expired');
                console.info(`berhasil terupdate jam: ${new Date()}`);
                }
            }

            console.info('update transaction')
        } 
        catch (error) {
            console.error(error)
        }
    } 

    //get all transaction by seller
    async getAllTrx(req, res) {

        try {
            const auth = req.userId

            const get = await this.transactionService.GetAllByUserId(auth)
            if(get.length == 0) { return responseHendler.notFound(res, message('transaction').notFoundResource)}

            return responseHendler.ok(res, message('get all transactions').success, get)
        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }
    //update status waiting ke on process
    async updateOnProcess(req, res) {

        try {
            const auth = req.userId
            const payload = req.params.id

            const get = await this.transactionService.GetById(payload, auth, 'waiting')
            if(!get) {return responseHendler.notFound(res, message('transaction').notFoundResource)}

            const update = await this.transactionService.Update(get.id, 'on process')
            if(!update) {return responseHendler.badRequest(res, message('cannot update').errorMessage)}

            return responseHendler.ok(res, message('update').success)
        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }

    }
    //update status on process ke shipping
    async updateShipping(req, res) {

        try {
            const auth = req.userId
            const payload = req.params.id

            const get = await this.transactionService.GetById(payload, auth, 'on process')
            if(!get) {return responseHendler.notFound(res, message('transaction').notFoundResource)}

            const update = await this.transactionService.Update(get.id, 'shipping')
            if(!update) {return responseHendler.badRequest(res, message('cannot update').errorMessage)}

            return responseHendler.ok(res, message('update').success)
        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }
    //  update status shipping ke delivered
    async updateDelivered(req, res) {

        try {
            const auth = req.userId
            const payload = req.params.id

            const get = await this.transactionService.GetById(payload, auth, 'shipping')
            if(!get) {return responseHendler.notFound(res, message('transaction').notFoundResource)}

            const update = await this.transactionService.Update(get.id, 'delivered')
            if(!update) {return responseHendler.badRequest(res, message('cannot update').errorMessage)}

            return responseHendler.ok(res, message('update').success)
        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }
    
}

module.exports = transactionController