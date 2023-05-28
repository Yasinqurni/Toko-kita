const express = require('express')
const app = express()
const {userRouter, itemRouter, cartRouter, orderRouter, imageRouter, walletRouter } = require('./app/routers')
const bodyParser = require('body-parser')

// const fileupload = require("express-fileupload")


const swaggerUi = require(`swagger-ui-express`)
const YAML = require('yamljs');
const swaggerDocument = YAML.load(`./swagger.yml`)

// app.use(fileupload());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
// Router
app.use('/v1', userRouter)
app.use('/v1', itemRouter)
app.use('/v1', cartRouter)
app.use('/v1', orderRouter)
app.use('/v1', imageRouter)
app.use('/v1', walletRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


module.exports = app  