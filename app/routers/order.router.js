
class orderRouter {
    constructor(router, orderController, tokenJwt, auth) {

        this.router = router
        this.orderController = orderController
        this.tokenJwt = tokenJwt,
        this.auth = auth

        this.router.post('/api/order',this.tokenJwt.verifyToken, this.auth.authorization('user'), this.orderController.checkout.bind(this.orderController))
        //konfirmasi pembayaran
        this.router.patch('/api/order',this.tokenJwt.verifyToken, this.auth.authorization('user'), this.orderController.confirmPayment.bind(this.orderController))
        //cancel order
        this.router.delete('/api/order',this.tokenJwt.verifyToken, this.auth.authorization('user'), this.orderController.cancelOrder.bind(this.orderController))

    }

    getRouter() {
        return this.router
      }
}



module.exports = orderRouter
