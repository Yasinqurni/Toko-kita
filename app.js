const express = require('express')
const app = express()
const {userRouter, itemRouter, cartRouter, orderRouter, imageRouter } = require('./app/routers')
const bodyParser = require('body-parser')
const swaggerUi = require(`swagger-ui-express`)
const YAML = require('yamljs');
const swaggerDocument = YAML.load(`./swagger.yml`);

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
// Router
app.use('/v1', userRouter)
app.use('/v1', itemRouter)
app.use('/v1', cartRouter)
app.use('/v1', orderRouter)
app.use('/v1', imageRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


module.exports = app  