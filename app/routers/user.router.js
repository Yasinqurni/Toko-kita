
class UserRouter {
    constructor(router, userController, tokenJwt) {
      this.router = router
      this.userController = userController
      this.tokenJwt = tokenJwt
  
      this.router.post('/api/register/user', this.userController.registerUser.bind(this.userController))
      this.router.post('/api/register/seller', this.userController.registerSeller.bind(this.userController))
      this.router.post('/api/login', this.userController.loginUser.bind(this.userController))
      this.router.get('/api/profile', this.tokenJwt.verifyToken, this.userController.profileUser.bind(this.userController))
    }
  
    getRouter() {
      return this.router
    }
  }
  
  module.exports = UserRouter

