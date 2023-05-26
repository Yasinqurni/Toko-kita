
const {Item, Image, Category, User} = require('../../db/models')
const {itemQueries} = require('../queries')
const {itemService} = require('../services')
const { itemController } = require('../controllers')
const router = require('express').Router()
const { tokenJwt } = require('../middlewares/authentication')
const auth = require('../middlewares/authorization')

const itemqueries = new itemQueries(Item, Image, Category, User)
const itemservice = new itemService(itemqueries)
const itemcontroller = new itemController(itemservice)
const tokenjwt = new tokenJwt()


//Create Item Endpoint
router.post('/api/item',tokenjwt.verifyToken, auth.authorization('seller'), itemcontroller.createItem.bind(itemcontroller))
//read Item Endpoint
router.get('/api/item', tokenjwt.verifyToken, auth.authorization('user'), itemcontroller.readItem.bind(itemcontroller))
//read Item by id Endpoint
router.get('/api/item/:id', tokenjwt.verifyToken, auth.authorization('user'), itemcontroller.readItemById.bind(itemcontroller))
//delete Item Endpoint
router.delete('/api/item/:id', tokenjwt.verifyToken, auth.authorization('seller'), itemcontroller.deleteItem.bind(itemcontroller))
//update Item Endpoint
router.patch('/api/item/:id',tokenjwt.verifyToken, auth.authorization('seller'), itemcontroller.updateItem.bind(itemcontroller))
//get item for seller
router.get('/api/itemseller',tokenjwt.verifyToken, auth.authorization('seller'), itemcontroller.getItemSeller.bind(itemcontroller))


module.exports = router
