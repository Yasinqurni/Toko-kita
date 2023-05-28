
const { Transaction } = require('../../db/models')
const { transactionQueries } = require('../queries')
const { transactionService }  = require('../services')
const { transactionController } = require('../controllers')

const transactionqueries = new transactionQueries(Transaction)
const transactionservice = new transactionService(transactionqueries)
const transactioncontroller = new transactionController(transactionservice)

const router = require('express').Router()
//router user
router.post('/api/transaction/expired', transactioncontroller.isExpired.bind(transactioncontroller))

module.exports = router