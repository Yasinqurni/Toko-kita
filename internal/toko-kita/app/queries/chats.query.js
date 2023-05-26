const { Chat, User } = require('../../db/models')

const findChatByRoomId = (payload) => {
    return Chat.findAll({
        attributes: ["id","sender_id", "room_id", "message"],
        where: {room_id: payload},
            order: [
                ['id', 'ASC'],
            ],
            include: {
                model: User,
                attributes: ['fullname'],
                as: 'owner'
            }
    })
}

const createChat = (payload, data) => {
    return Chat.create({
        sender_id : payload.decodedJWT.id,
        room_id : payload.query.room_id,
        message: data
    })
}

module.exports = {
    findChatByRoomId,
    createChat
}