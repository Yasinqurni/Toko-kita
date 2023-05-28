const {History, Wallet, User} = require('../../db/models')
const {userQueries, walletQueries, historyQueries} = require('../queries')
const {walletService, userService, historyService} = require('../services')
const {walletController} = require('../controllers')
const { tokenJwt } = require('../middlewares/authentication')

const userqueries = new userQueries(User)
const walletqueries = new walletQueries(Wallet)
const historyqueries = new historyQueries(History)
const walletservice = new walletService(walletqueries)
const userservice = new userService(userqueries)
const historyservice = new historyService(historyqueries)
const walletcontroller = new walletController(walletservice, userservice, historyservice)

const tokenjwt = new tokenJwt()


const router = require('express').Router()

//cek saldo
router.get('/api/wallet', tokenjwt.verifyToken, walletcontroller.myWallet.bind(walletcontroller))
//register wallet
router.post('/api/wallet', tokenjwt.verifyToken, walletcontroller.createWallet.bind(walletcontroller))
//topup saldo
router.patch('/api/wallet', tokenjwt.verifyToken, walletcontroller.topUpSaldo.bind(walletcontroller))
//get transaction history
router.get('/api/history', tokenjwt.verifyToken, walletcontroller.transactionHistory.bind(walletcontroller))

module.exports = router