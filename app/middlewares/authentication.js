const jwt = require('jsonwebtoken')
const config = require('../../db/config/auth')
const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')



class tokenJwt {

    verifyToken (req, res, next) {

        const token = req.headers['authorization']
        if(!token) {return responseHendler.authenticationFailed(res, message().unathentication)}

        jwt.verify(token, config.secret, (err, decoded) =>{
            if(err) {
                return res.status(401).json({
                    message: 'unauthentized!'
                })
            }
            req.userId = decoded.id
            req.userRole = decoded.role
            next()
        })
    }

    verifyTokenSocket (socket, next) {

        try {
            const token = socket.handshake.headers['authorization']
            console.log(token)
            if(!token) {throw new Error("jwt token not found!")}
    
            jwt.verify(token, config.secret, (err, decoded) =>{
                if(err) {
                    throw new Error('Authentication error')
                }
                socket.handshake.decodedJWT = decoded;
                next()
            })
        } catch (error) {
            next(error)
        }
        
    }

}

module.exports = {
    tokenJwt,
}