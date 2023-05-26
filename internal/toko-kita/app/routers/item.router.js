const { itemController } = require('../controllers/item.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middlewares/authentication')
const auth = require('../middlewares/authorization')


const itemcontroller = new itemController()
const tokenjwt = new tokenJwt()


//Create Item Endpoint
router.post('/api/item',tokenjwt.verifyToken, auth.authorization('seller'), itemcontroller.createItem)
//read Item Endpoint
router.get('/api/item', itemcontroller.readItem)
//read Item by id Endpoint
router.get('/api/item/:id', itemcontroller.readItemById)
//delete Item Endpoint
router.delete('/api/item/:id', tokenjwt.verifyToken, auth.authorization('seller' || 'admin'), itemcontroller.deleteItem)
//update Item Endpoint
router.patch('/api/item/:id',tokenjwt.verifyToken, auth.authorization('seller'), itemcontroller.updateItem)
//get item for seller
router.get('/api/itemseller',tokenjwt.verifyToken, auth.authorization('seller'), itemcontroller.getItemSeller)


module.exports = router
