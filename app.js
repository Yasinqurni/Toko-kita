const express = require('express')


const {userRouter, itemRouter, cartRouter, orderRouter, imageRouter, walletRouter, transactionRouter } = require('./app/routers')
const bodyParser = require('body-parser')


const app = express()
const swaggerUi = require(`swagger-ui-express`)
const YAML = require('yamljs');
const swaggerDocument = YAML.load(`./swagger.yaml`)


app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
// Router
app.use('/v1', userRouter)
app.use('/v1', itemRouter)
app.use('/v1', cartRouter)
app.use('/v1', orderRouter)
app.use('/v1', imageRouter)
app.use('/v1', walletRouter)
app.use('/v1', transactionRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



module.exports = app  