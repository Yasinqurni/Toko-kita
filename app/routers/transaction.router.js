
class transactionRoter{

    constructor(router, transactionController, tokenJwt, auth) {

        this.router = router
        this.transactionController = transactionController
        this.tokenJwt = tokenJwt,
        this.auth = auth

        //router get transaction
        this.router.get('/api/transaction', this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.transactionController.getAllTrx.bind(this.transactionController))
        //update onprosess
        this.router.patch('/api/onprocess/:id', this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.transactionController.updateOnProcess.bind(this.transactionController))
        //update shipping
        this.router.patch('/api/shipping/:id', this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.transactionController.updateShipping.bind(this.transactionController))
        //update delivered
        this.router.patch('/api/delivered/:id', this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.transactionController.updateDelivered.bind(this.transactionController))

    }

    getRouter() {
        return this.router
      }
      
}

module.exports = transactionRoter