const { orderController } = require('../controllers/order.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middlewares/authentication')


const ordercontroller = new orderController()
const tokenjwt = new tokenJwt()

//c
router.post('/api/order',tokenjwt.verifyToken, ordercontroller.checkout)
//konfirmasi pembayaran
router.patch('/api/order',tokenjwt.verifyToken, ordercontroller.confirmPayment)
//cancel order
router.delete('/api/order',tokenjwt.verifyToken, ordercontroller.cancelOrder)



module.exports = router
