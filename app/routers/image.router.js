const { imageController } = require('../controllers')
const router = require('express').Router()
const { tokenJwt } = require('../middlewares/authentication')
const auth = require('../middlewares/authorization')

const imagecontroller = new imageController()
const tokenjwt = new tokenJwt()

router.post('/api/image/:id', tokenjwt.verifyToken, auth.authorization('seller'), imagecontroller.uploadImage)
router.delete('/api/image/:id', tokenjwt.verifyToken, auth.authorization('seller'), imagecontroller.removeImage)

module.exports = router