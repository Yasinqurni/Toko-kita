const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')
const { loginDecorator, profileDecorator } = require('../decorators/users-decorator')


class userController {

    constructor(userService, formatValidator, generateToken, isMatch) {
        this.userservice = userService
        this.formatValidator = formatValidator
        this.generateToken = generateToken
        this.isMatch = isMatch

    }

    async registerUser(req, res) {
        try {
            const payload = req.body
            //validate email is exist
            const findUser = await this.userservice.GetByEmail(payload)
            if (findUser) { return responseHendler.duplicate(res, message('email').duplicateData) }
            //validate format email and numberphone
            const formatIsValid = await this.formatValidator(payload)
            if (formatIsValid === false) { return responseHendler.badRequest(res, message('email/phone').invalidEmailOrPassword) }
            //create a new user
            const newUser = await this.userservice.Create(payload, 'user')
            if (!newUser) { return responseHendler.internalError(res, message().serverError) }

            return responseHendler.ok(res, message('register').success)
        }

        catch (err) {
            const key = err.message
            console.log(err)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async registerSeller(req, res) {
        try {
            const payload = req.body
            //validate email is exist
            const findUser = await this.userservice.GetByEmail(payload)
            if (findUser) { return responseHendler.duplicate(res, message('email').duplicateData) }
            //validate format email and numberphone
            const formatIsValid = await this.formatValidator(payload)
            if (formatIsValid === false) { return responseHendler.badRequest(res, message('email/phone').invalidEmailOrPassword) }
            //create a new user
            const newUser = await this.userservice.Create(payload, 'seller')
            if (!newUser) { return responseHendler.internalError(res, message().serverError) }

            return responseHendler.ok(res, message('register').success)
        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async loginUser(req, res) {

        try {
            //find user
            const payload = req.body

            const findUser = await this.userservice.GetByEmail(payload)
            if (!findUser) { return responseHendler.notFound(res, message('email').notFoundResource) }

            const ismatch = await this.isMatch.isMatch(payload.password, findUser)
            if (!ismatch) { return responseHendler.notFound(res, message('wrong password').errorMessage) }

            const token = await this.generateToken(findUser)
            if (!token) { return responseHendler.internalError(res, message().serverError) }

            const data = loginDecorator(findUser, token)
            return responseHendler.ok(res, message('login').success, data)
        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }

    }

    async profileUser(req, res) {

        try {

            const payload = req.userId
            const userProfile = await this.userservice.GetById(payload)
            if (!userProfile) { return responseHendler.notFound(res, message('user').notFoundResource) }

            const data = profileDecorator(userProfile)
            return responseHendler.ok(res, message('profile').success, data)
        }
        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }
}

module.exports = userController
