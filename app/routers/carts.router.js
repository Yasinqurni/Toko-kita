const { cartController } = require('../controllers')
const router = require('express').Router()
const { tokenJwt } = require('../middlewares/authentication')
const auth = require('../middlewares/authorization')



const cartcontroller = new cartController()
const tokenjwt = new tokenJwt()


//add cart
router.post('/api/cart/:id',tokenjwt.verifyToken, auth.authorization('user'), cartcontroller.addCart)

//show cart
router.get('/api/cart',tokenjwt.verifyToken, cartcontroller.showCart)


module.exports = router
