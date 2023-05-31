
class imageRouter {
    constructor(router, imageController, tokenJwt, auth) {
        this.router = router
        this.imageController = imageController
        this.tokenJwt = tokenJwt,
        this.auth = auth

        this.router.post('/api/image/:id', this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.imageController.uploadImage.bind(this.imageController))
        this.router.delete('/api/image/:id', this.tokenJwt.verifyToken, this.auth.authorization('seller'), this.imageController.removeImage.bind(this.imageController))
        
    }

    getRouter() {
        return this.router
      }
  
}


module.exports = imageRouter