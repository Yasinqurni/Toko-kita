const { userQueries, chatQueries } = require('../queries');

class socketioController {
    async chat(socket) {
        // ambil user dari tabel users
        const sender = await userQueries.findUserById(socket.handshake.decodedJWT.id);
        
        // cek apakah sender id sama dengan room id atau admin
        if (!(sender.id == socket.handshake.query.room_id || sender.role == "admin")) {
            socket.emit('error', "room id harus sama dengan sender id / role sender harus admin");
            socket.disconnect();
        }
        
        console.log('a user connected');
        socket.join(socket.handshake.query.room_id);
        
        // ambil history chat dari tabel chats
        const chatHistory = await chatQueries.findChatByRoomId(socket.handshake.query.room_id);
    
        // load chatHistory
        for(let data of chatHistory){
            const message = data.message;
            const owner = data.owner;
    
            if (socket.handshake.query.room_id == data.sender_id) {
                socket.emit("messageHistory", `${owner.fullname}: ${message}`)
            } else {
                socket.emit("messageHistory", `Admin ${owner.fullname}: ${message}`)
            }
        };

        // listen event sendEvent
        socket.on('sendEvent', async (data) => {
            await chatQueries.createChat(socket.handshake, data);
            
            // mengirim pesan dengan event messageReceived
            if (sender.id == socket.handshake.query.room_id) {
                socket.to(socket.handshake.query.room_id).emit("messageReceived", `${sender.fullname}: ${data}`);
            } else {
                socket.to(socket.handshake.query.room_id).emit("messageReceived", `Admin ${sender.fullname}: ${data}`);
            }
        });
    }
}

module.exports = socketioController;