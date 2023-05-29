
const { Transaction } = require('../../db/models')
const { transactionQueries } = require('../queries')
const { transactionService }  = require('../services')
const { transactionController } = require('../controllers')
const { tokenJwt } = require('../middlewares/authentication')
const auth = require('../middlewares/authorization')

const transactionqueries = new transactionQueries(Transaction)
const transactionservice = new transactionService(transactionqueries)
const transactioncontroller = new transactionController(transactionservice)
const tokenjwt = new tokenJwt()

const router = require('express').Router()
//router get transaction
router.get('/api/transaction', tokenjwt.verifyToken, auth.authorization('seller'), transactioncontroller.getAllTrx.bind(transactioncontroller))
//update onprosess
router.patch('/api/onprocess/:id', tokenjwt.verifyToken, auth.authorization('seller'), transactioncontroller.updateOnProcess.bind(transactioncontroller))
//update shipping
router.patch('/api/shipping/:id', tokenjwt.verifyToken, auth.authorization('seller'), transactioncontroller.updateShipping.bind(transactioncontroller))
//update delivered
router.patch('/api/delivered/:id', tokenjwt.verifyToken, auth.authorization('seller'), transactioncontroller.updateDelivered.bind(transactioncontroller))

module.exports = router