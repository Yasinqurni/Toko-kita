const SocketController = require(`../controllers/socketio.controller.js`)
const { tokenJwt } = require('../middlewares/authentication.js')

const socketController = new SocketController()
const tokenjwt = new tokenJwt();

module.exports = function(io) {
    io.of('/chat').use((socket, next) => {
        tokenjwt.verifyTokenSocket(socket, next)
    });
    io.of('/chat').on('connection', socketController.chat);
}