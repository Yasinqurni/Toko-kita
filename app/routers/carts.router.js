const {Item, Image, User, Item_cart, Cart} = require('../../db/models')
const {itemQueries, cartQueries, itemCartQueries} = require('../queries')
const { itemService, cartService, itemCartService } = require('../services')
const { cartController } = require('../controllers')
const router = require('express').Router()
const { tokenJwt } = require('../middlewares/authentication')
const auth = require('../middlewares/authorization')

const itemqueries = new itemQueries(Item, Image, User)
const cartqueries = new cartQueries(Cart, Item_cart, Item, User)
const itemcartqueries = new itemCartQueries(Item_cart, Item)
const itemservice = new itemService(itemqueries)
const cartservice = new cartService(cartqueries)
const itemcartservice = new itemCartService(itemcartqueries)
const cartcontroller = new cartController(itemservice, cartservice, itemcartservice)
const tokenjwt = new tokenJwt()


//add cart
router.post('/api/cart/:id',tokenjwt.verifyToken, auth.authorization('user'), cartcontroller.addCart.bind(cartcontroller))

//show cart
router.get('/api/cart',tokenjwt.verifyToken, cartcontroller.showCart.bind(cartcontroller))


module.exports = router
