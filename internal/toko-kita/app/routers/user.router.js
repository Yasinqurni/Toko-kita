
const { userController } = require('../controllers/user.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

const usercontroller = new userController()
const tokenjwt = new tokenJwt()


//router user
router.post('/api/register/user', usercontroller.registerUser)
// router seller
router.post('/api/register/seller', usercontroller.registerSeller)
//router admin
router.post('/api/register/admin', usercontroller.registerAdmin)
//router login
router.post('/api/login', usercontroller.loginUser)
//router cek profile
router.get('/api/profile', tokenjwt.verifyToken, usercontroller.profileUser) //

router.get("/api/verify-email", usercontroller.verificationUser)

module.exports = router
