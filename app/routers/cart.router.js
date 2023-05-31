
class cartRouter {
    constructor(router, cartController, tokenJwt, auth) {
        
        this.router = router
        this.cartController = cartController
        this.tokenJwt = tokenJwt,
        this.auth = auth
        //add cart
        this.router.post('/api/cart/:id',this.tokenJwt.verifyToken, this.auth.authorization('user'), this.cartController.addCart.bind(this.cartController))

        //show cart
        this.router.get('/api/cart',this.auth.verifyToken, this.cartController.showCart.bind(this.cartController))

    }

    getRouter() {
        return this.router
      }
}


module.exports = cartRouter
