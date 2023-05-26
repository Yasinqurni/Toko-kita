const dotenv = require('dotenv')

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const app = require('../../internal/toko-kita/app')

const port = process.env.PORT

const server = app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

// socket.io
const socketio = require('socket.io');
const io = socketio(server);
require('./app/routers/socketio.router')(io);