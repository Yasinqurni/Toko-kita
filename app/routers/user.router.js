const { User } = require('../../db/models')
const { userQueries} = require('../queries')
const { userService } = require('../services')
const { userController } = require('../controllers')
const { tokenJwt } = require('../middlewares/authentication')
const formatValidator = require('../middlewares/user.validation')
const generateToken = require('../../lib/jwt')
const isMatch = require('../../lib/bcrypt')

const userqueries = new userQueries(User)
const userservice = new userService(userqueries)
const usercontroller = new userController(userservice, formatValidator, generateToken, isMatch)
const tokenjwt = new tokenJwt()


const router = require('express').Router()
//router user
router.post('/api/register/user', usercontroller.registerUser.bind(usercontroller))
// router seller
router.post('/api/register/seller', usercontroller.registerSeller.bind(usercontroller))
//router login
router.post('/api/login', usercontroller.loginUser.bind(usercontroller))
//router cek profile
router.get('/api/profile', tokenjwt.verifyToken, usercontroller.profileUser.bind(usercontroller)) //


module.exports = router
