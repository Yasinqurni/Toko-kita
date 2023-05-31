
class wallerRouter{

    constructor(router, walletController, tokenJwt, auth) {

        this.router = router
        this.walletController = walletController
        this.tokenJwt = tokenJwt,
        this.auth = auth

        this.router.get('/api/wallet', this.tokenJwt.verifyToken, this.walletController.myWallet.bind(this.walletController))
        //register wallet
        this.router.post('/api/wallet', this.tokenJwt.verifyToken, this.walletController.createWallet.bind(this.walletController))
        //topup saldo
        this.router.patch('/api/wallet', this.tokenJwt.verifyToken, this.walletController.topUpSaldo.bind(this.walletController))
        //get transaction history
        this.router.get('/api/history', this.tokenJwt.verifyToken, this.walletController.transactionHistory.bind(this.walletController))
    }

    getRouter() {
        return this.router
      }
}
//cek saldo

module.exports = wallerRouter