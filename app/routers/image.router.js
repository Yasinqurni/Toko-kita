const {Item, Image, Category, User} = require('../../db/models')
const {imageQueries, itemQueries} = require('../queries')
const {imageService, itemService} = require('../services')
const { imageController } = require('../controllers')
const { tokenJwt } = require('../middlewares/authentication')
const auth = require('../middlewares/authorization')
const upload = require('../services/upload')

const imagequeries = new imageQueries(Image)
const itemqueries = new itemQueries(Item, Image, Category, User)
const imageservice = new imageService(imagequeries)
const itemservice = new itemService(itemqueries)
const imagecontroller = new imageController(imageservice, itemservice, upload)
const tokenjwt = new tokenJwt()

const router = require('express').Router()

router.post('/api/image/:id', tokenjwt.verifyToken, auth.authorization('seller'), imagecontroller.uploadImage.bind(imagecontroller))
router.delete('/api/image/:id', tokenjwt.verifyToken, auth.authorization('seller'), imagecontroller.removeImage.bind(imagecontroller))

module.exports = router