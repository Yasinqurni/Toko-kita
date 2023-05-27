const {User, Item, Cart, Order, Item_cart, Image} = require('../../db/models')
const {cartQueries, orderQueries, itemCartQueries, itemQueries} = require('../queries')
const {cartService, orderService, itemCartService, itemService} = require('../services')
const { orderController } = require('../controllers')
const auth = require('../middlewares/authorization')
const { tokenJwt } = require('../middlewares/authentication')


const cartqueries = new cartQueries(Cart, Item_cart, Item, User)
const orderqueries = new orderQueries(Order)
const itemcartqueries = new itemCartQueries(Item_cart)
const itemqueries = new itemQueries(Item, Image, User)
const cartservice = new cartService(cartqueries)
const orderservice = new orderService(orderqueries)
const itemservice = new itemService(itemqueries)
const itemcartservice = new itemCartService(itemcartqueries)
const ordercontroller = new orderController(cartservice, orderservice, itemcartservice, itemservice)
const tokenjwt = new tokenJwt()


const router = require('express').Router()

router.post('/api/order',tokenjwt.verifyToken, auth.authorization('user'), ordercontroller.checkout.bind(ordercontroller))
//konfirmasi pembayaran
router.patch('/api/order',tokenjwt.verifyToken, auth.authorization('user'), ordercontroller.confirmPayment.bind(ordercontroller))
//cancel order
router.delete('/api/order',tokenjwt.verifyToken, auth.authorization('user'), ordercontroller.cancelOrder.bind(ordercontroller))



module.exports = router
