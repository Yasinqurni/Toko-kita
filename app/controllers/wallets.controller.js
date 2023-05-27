
const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')

class walletController {

    constructor(walletService, userService) {
        this.walletService = walletService
        this.userService = userService
    }

    async myWallet(req, res) {

        try {
            const auth = req.userId

            const getUser = await this.userService.GetById(auth)
            if(!getUser) {return responseHendler.notFound(res, message('user').notFoundResource)}

            const getWallet = await this.walletService.GetByUserId(getUser.id)
            if(!getWallet) {return responseHendler.notFound(res, message('wallet').notFoundResource)}

            return responseHendler.ok(res, message('get wallet').success, getWallet) 
        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async createWallet(req, res) {

        try {
            const auth = req.userId

            const getUser = await this.userService.GetById(auth)
            if(!getUser) {return responseHendler.notFound(res, message('user').notFoundResource)}

            const createWallet = await this.walletService.Create(getUser.id, 0)
            if(!createWallet) {return responseHendler.badRequest(res, message('wallet').invalidCreateResource)}

            return responseHendler.ok(res, message('wallet').created) 

        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }

        
    }

    async topUpSaldo(req, res) {

        try {
            const auth = req.userId

            const payload = req.body.saldo
            if(payload == undefined) { return responseHendler(res, message('please input saldo').errorMessage) } 

            const getUser = await this.userService.GetById(auth)
            if(!getUser) {return responseHendler.notFound(res, message('user').notFoundResource)}

            const getWallet = await this.walletService.GetByUserId(getUser.id)
            if(!getWallet) {return responseHendler.notFound(res, message('wallet').notFoundResource)}

            const updateWallet = await this.walletService.Update(getUser.id, payload)
            if(!updateWallet) {return responseHendler.badRequest(res, message('cannot top up').errorMessage)}

            return responseHendler.ok(res, message('top up').success)

        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async transactionHistory(req, res) {

        try {
            
        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

}

module.exports = walletController