const decorator = require('../decorators/wallets-decorator')
const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')

class walletController {

    constructor(walletService, userService, historyService) {
        this.walletService = walletService
        this.userService = userService
        this.historyService = historyService
    }

    async myWallet(req, res) {

        try {
            const auth = req.userId

            const getUser = await this.userService.GetById(auth)
            if(!getUser) {return responseHendler.notFound(res, message('user').notFoundResource)}

            const getWallet = await this.walletService.GetByUserId(getUser.id)
            if(!getWallet) {return responseHendler.notFound(res, message('wallet').notFoundResource)}

            const data = decorator.myWallet(getWallet)
            return responseHendler.ok(res, message('get wallet').success, data) 
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
            
            const getWallet = await this.walletService.GetByUserId(getUser.id)
            if(getWallet) {return responseHendler.notFound(res, message('you already have a wallet').errorMessage)}

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
            if(payload == undefined) { return responseHendler.notFound(res, message('please input saldo').errorMessage) } 

            const getUser = await this.userService.GetById(auth)
            if(!getUser) {return responseHendler.notFound(res, message('user').notFoundResource)}

            const getWallet = await this.walletService.GetByUserId(getUser.id)
            if(!getWallet) {return responseHendler.notFound(res, message('wallet').notFoundResource)}

            const saldoNow = getWallet.saldo + payload
            const updateWallet = await this.walletService.Update(getWallet.id, saldoNow)
            if(!updateWallet) {return responseHendler.badRequest(res, message('cannot top up').errorMessage)}

            const createHistory = await this.historyService.Create(getWallet.id, payload, "cash in", "top up saldo")
            if(!createHistory){ return responseHendler.badRequest(res, message('error create history').errorMessage)}

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

            const auth = req.userId

            const getUser = await this.userService.GetById(auth)
            if(!getUser) {return responseHendler.notFound(res, message('user').notFoundResource)}

            const getWallet = await this.walletService.GetByUserId(getUser.id)
            if(!getWallet) {return responseHendler.notFound(res, message('wallet').notFoundResource)}

            const getHistory = await this.historyService.GetAll(getWallet.id)
            if(!getHistory) {return responseHendler.notFound(res, message('wallet').notFoundResource)}

            const data = await decorator.history(getHistory)
            return responseHendler.ok(res, message('get transaction History').success, data)
        } 
        catch (error) {
            const key = error.message
            console.log(error)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

}

module.exports = walletController