
class itemRouter {
    constructor(router, itemController, tokenJwt, auth) {
        this.router = router
        this.itemController = itemController
        this.tokenJwt = tokenJwt,
        this.auth = auth
        //Create Item Endpoint
        this.router.post('/api/item',this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.itemController.createItem.bind(this.itemController))
        //read Item Endpoint
        this.router.get('/api/item', this.tokenJwt.verifyToken, this.itemController.readItem.bind(this.itemController))
        //read Item by id Endpoint
        this.router.get('/api/item/:id', this.tokenJwt.verifyToken, this.itemController.readItemById.bind(this.itemController))
        //delete Item Endpoint
        this.router.delete('/api/item/:id', this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.itemController.deleteItem.bind(this.itemController))
        //update Item Endpoint
        this.router.patch('/api/item/:id',this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.itemController.updateItem.bind(this.itemController))
        //get item for seller
        this.router.get('/api/itemseller',this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.itemController.getItemSeller.bind(this.itemController))

    }

    getRouter() {
        return this.router
      }
  
}


module.exports = itemRouter
